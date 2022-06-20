const fs = require('fs');
const pdf = require('html-pdf');
const moments = require('moment-timezone');
const nodemailer = require('nodemailer');
const uuid = require('uuid').v4;

const pdfTemplate = require('../documents/pdfPage');

const Forms = require('../models/Forms');

function uploadFile(req, res) {
  return res.json({ status: 'OK', uploaded: req.file });
}

async function createImgFromSignature(req, res) {
  const id = uuid();

  try {
    const base64String = req.body.statementAndSignature.wrapperCanvas;
    let base64Image = base64String.split(';base64,').pop();
    fs.writeFile(
      `server/static/signatures/${req.body?.employeeDetails?.firstName}-${req.body?.employeeDetails?.lastName}-${id}.png`,
      base64Image,
      { encoding: 'base64' },
      function (err) {
        if (err) throw new Error(err);

        const newState = {
          ...req.body,
          statementAndSignature: `server/static/signatures/${req.body?.employeeDetails?.firstName}-${req.body?.employeeDetails?.lastName}-${id}.png`
        };
        res.status(200).send(newState);
      }
    );
  } catch (error) {
    res.status(400).send('נכשל בעיבוד החתימה');
  }
}

async function createPdf(req, res) {
  const id = uuid();
  const html = await pdfTemplate(req.body);

  pdf
    .create(html, {
      width: '831.48px',
      height: '1180px',
      border: '0px'
    })
    .toFile(`./server/assets/pdf/${id}.pdf`, (err, filename) => {
      if (err) {
        res.status(400).send({
          res: Promise.resolve(),
          filename: err
        });
      } else {
        res.status(201).send({
          res: Promise.resolve(),
          filename: filename.filename
        });
      }
    });
}

function deleteFile(req, res) {
  try {
    const fileExists = fs.existsSync(req.body?.path + '');
    if (fileExists) {
      fs.unlinkSync(req.body.path + '');
      res.status(201).json({ filePath: req.body });
    } else {
      throw 'לא נמצא קובץ';
    }
  } catch (error) {
    res.status(400).send('לא נמצא קובץ');
  }
}

function fetchPdfToBlob(req, res) {
  try {
    if (req.query.filename) {
      fs.readFile(req.query.filename + '', (e, data) => {
        res.contentType('application/pdf');
        res.status(201).send(data);
      });
    } else {
      throw 'לא נמצא קובץ';
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

async function sendToMail(req, res) {
  try {
    const mailOptions = {
      from: 'atofes101@gmail.com',
      subject: 'אישור טופס 101',
      html: htmlToMail(req.body?.employeeDetails?.firstName),
      to: [
        req.body?.employeeDetails?.email
        // req.body?.employerData?.email  // מייל נוסף למעביד (עותק)
      ],
      attachments: makeArrayForAllFiles(req.body, req.body?.filename)
    };

    let mail = await wrapedSendMail(req.body?.filename, mailOptions);
    res.status(200).json(mail);
  } catch (error) {
    console.log(error);
    res.status(400).send('שגיאה בשליחת המייל');
  }
}

async function saveFormInDB(req, res) {
  try {
    delete req.body.employerData;
    const thing = new Forms(req.body);
    const saveing = await thing.save();

    res.status(200).send(saveing);
  } catch (error) {
    res.status(400).send('שגיאה בשמירת הנתונים');
  }
}

async function sendToMail(req, res) {
  try {
    const mailOptions = {
      from: 'atofes101@gmail.com',
      subject: 'אישור טופס 101',
      html: htmlToMail(req.body?.employeeDetails?.firstName),
      to: [
        req.body?.employeeDetails?.email
        // req.body?.employerData?.email  // מייל נוסף למעביד (עותק)
      ],
      attachments: makeArrayForAllFiles(req.body, req.body?.filename)
    };

    let mail = await wrapedSendMail(req.body?.filename, mailOptions);
    res.status(200).json(mail);
  } catch (error) {
    console.log(error);
    res.status(400).send('שגיאה בשליחת המייל');
  }
}

module.exports = {
  uploadFile,
  createImgFromSignature,
  createPdf,
  deleteFile,
  fetchPdfToBlob,
  saveFormInDB,
  sendToMail
};

// Make array for all files to email
function makeArrayForAllFiles(allData, filename) {
  const allFiles = [
    {
      filename: 'טופס-101.pdf',
      path: filename + '',
      contentType: 'application/pdf'
    },
    {
      filename: '6550ea8137481339d31816d6ab4fbdd7.png',
      path: './server/assets/img/6550ea8137481339d31816d6ab4fbdd7.png',
      cid: 'image1@johnson.com'
    }
  ];

  if (allData.files && Object.values(allData.files).length > 0) {
    for (let i = 0; i < Object.values(allData.files).length; i++) {
      allFiles.push(Object.values(allData.files)[i]);
    }
  }
  return allFiles;
}

// Send email
async function wrapedSendMail(filename, mailOptions) {
  return await new Promise((resolve, reject) => {
    const settings = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLC: true,
      auth: {
        user: 'atofes101@gmail.com',
        pass: '0534211690'
      }
    };

    const transporter = nodemailer.createTransport(settings);

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('error is ' + error);
        fs.unlinkSync(filename + '');
        resolve(false); // or use rejcet(false) but then you will have to handle errors
      } else {
        fs.unlinkSync(filename + '');
        resolve(info);
      }
    });
  });
}

let htmlToMail = (name) => {
  const date = moments.tz('Asia/Jerusalem');

  return `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    </head>

    <body>
    <div style="margin: 0; padding: 0" dir="ltr" bgcolor="#ffffff">
        <div style="    padding: 2px;
        display: table;
        border: 1px solid #7a7a7a;
        margin: 0 auto;
        border-radius: 20px;">
            <table
        border="0"
        cellspacing="0"
        cellpadding="0"
        align="center"
        style="border-collapse: collapse;"
        >
        <tbody>
            <tr>
            <td height="16" style="line-height: 16px">&nbsp;</td>
            </tr>
            <tr>
            <td align="center">
                <img src='cid:image1@johnson.com' style="margin:0 auto 0 auto 0;" height=76 width=76 alt=""  />
            </td>
            </tr>
            <tr>
            <td height="16" style="line-height: 16px">&nbsp;</td>
            </tr>
            <tr>
            <td
                style="
                width: 300px;
                padding: 0;
                margin: 0;
                text-align: center;
                color: #262626;
                font-size: 18px;
                font-family: Helvetica Neue, Helvetica, Roboto, Arial,
                    sans-serif;
                    direction:rtl;
                "
            >
                שלום ${name}!
            </td>
            </tr>

            <tr>
            <td>&nbsp;</td>
            </tr>
            <tr>
            <td
                style="
                width: 300px;
                padding: 0;
                margin: 0;
                text-align: center;
                color: #999999;
                font-size: 14px;
                font-family: Roboto, Arial, sans-serif;
                "
            >
                מצורף אישור לטופס 101 שמילאת
            </td>
            </tr>
            <tr>
                <td  style="
                width: 300px;
                padding: 0;
                margin: 0;
                text-align: center;
                color: #999999;
                padding-top: 6px;
                font-size: 14px;
                font-family: Roboto, Arial, sans-serif;
            ">
                בתאריך: ${date.format('DD/MM/YYYY')}
            </tr>
            <tr>
            </td>
            <td  style="
            width: 300px;
            padding: 0;
            margin: 0;
            text-align: center;
            color: #999999;
            padding-top: 6px;
            font-size: 14px;
            font-family: Roboto, Arial, sans-serif;
        ">
            בשעה: ${date.format('HH:mm')}
            </td>
            </tr>
            <tr>
            <td height="16" style="line-height: 16px">&nbsp;</td>
            </tr>
        </tbody>
        </table>
        </div>
    </div>
    </body>
</html>`;
};
