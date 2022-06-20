const router = require('express').Router();

const {
  uploadFile,
  createImgFromSignature,
  createPdf,
  deleteFile,
  fetchPdfToBlob,
  saveFormInDB,
  sendToMail
} = require('../controllers/form101Controller');

const upload = require('../create-files/create-uuid-file');

// POST - load files end upload to DB
router.post('/upload', upload.single('file'), uploadFile);

// POST - Create img from signature
router.post('/create-img-from-signature', createImgFromSignature);

// POST - PDF generation and of the fetching of the data
router.post('/create-pdf', createPdf);

// Delete file from static/uploads
router.post('/deleteFile', deleteFile);

// GET - PDF send the generated PDF of the client
router.post('/fetch-pdf-to-blob', fetchPdfToBlob);

// POST - save all data from tofes 101 to DB
router.post('/sendToMail', sendToMail);

// POST - Save all data form in db
router.post('/saveFormInDB', saveFormInDB);

module.exports = router;
