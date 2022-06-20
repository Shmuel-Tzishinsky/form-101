const moments = require('moment-timezone');
const imgA = require('./img-pdf/imgA');
const imgB = require('./img-pdf/imgB');

module.exports = async (allData) => {
  let {
    header,
    employerData,
    employeeDetails,
    children,
    incomeFromThisEmployer,
    otherIncomes,
    partner,
    taxExemptionOrCredit,
    taxCoordination,
    statementAndSignature
  } = allData;

  partner = partner ? partner : {};
  taxExemptionOrCredit = taxExemptionOrCredit ? taxExemptionOrCredit : {};
  taxCoordination = taxCoordination ? taxCoordination : {};

  const date = moments.tz('Asia/Jerusalem');

  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="כרטיס עובד - ובקשה להקלה ולתיאום מס על ידי המעביד
    לפי תקנות מס הכנסה (ניכוי ממשכורת ומשכר עבודה), התשנ" ג="" -="" 1993>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="robots" content="noindex, nofollow">
        <meta name="author" content="Steve Gershin - I beg your pardon">
        <!-- <link rel="stylesheet" href="page-b.css">
        <link rel="stylesheet" href="text.css" /> -->
        <title>101 | טופס מקוון</title>
      ${style}
    </head>
    
    <body>
        <div class="app">
            <div class="page-a">
                <img src="${imgA()}" class="img-background" alt="">


                <!-- שנת המס -->
                <div class="tax-year">${header.taxYear || ''}</div>


                <!-- פרטי המעביד -->
                <div class="employer-information">
                    <div class="name">${employerData?.name}</div>
                    <div class="adres">${employerData?.address}</div>
                    <div class="phone">${employerData?.phone}</div>
                    <div class="file-num">${
                      employerData?.deductionsPortfolio
                    }</div>
                </div>


                <!-- פרטי העובד/ת -->
                <div class="employee-details">
                    <div class="line-a">
                        <div class="num-id">${
                          employeeDetails.idBy === 'id'
                            ? employeeDetails['id-employee'] || ''
                            : ''
                        }</div>
                        <div class="famely">${
                          employeeDetails.lastName || ''
                        }</div>
                        <div class="name">${
                          employeeDetails.firstName || ''
                        }</div>
                        <div class="date-of-birth">${
                          employeeDetails.birthDay
                            ? `${plusZiro(employeeDetails.birthDay)}${plusZiro(
                                employeeDetails.birthMonth
                              )}${employeeDetails.birthYear}`
                            : ''
                        }</div>
                        <div class="date-increase">${
                          employeeDetails.increaseDay
                            ? `${plusZiro(
                                employeeDetails.increaseDay
                              )}${plusZiro(employeeDetails.increaseMonth)}${
                                employeeDetails.increaseYear
                              }`
                            : ''
                        }</div>
                    </div>
    
                    <div class="line-b">
                        <div class="passport">${
                          employeeDetails.idBy === 'passport'
                            ? employeeDetails['id-employee'] || ''
                            : ''
                        }</div>
                        <div class="privet-adres">
                            <div class="adres">${
                              employeeDetails.street || ''
                            }</div>
                            <div class="num">${
                              employeeDetails.homeNum || ''
                            }</div>
                            <div class="citi">${
                              employeeDetails.citi || ''
                            }</div>
                            <div class="postal-code">${
                              employeeDetails.postalCode || ''
                            }</div>
                        </div>
                    </div>
    
                    <div class="line-c">
                        <div class="box-a">
                            <div class="x-a">${
                              employeeDetails.gender === 'men' ? 'x' : ''
                            }</div>
                            <div class="x-b">${
                              employeeDetails.gender === 'woman' ? 'x' : ''
                            }</div>
                        </div>
                        <div class="box-b">
                            <div class="x-a">${
                              employeeDetails.maritalStatus === 'bachelor'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-b">${
                              employeeDetails.maritalStatus === 'married'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-c">${
                              employeeDetails.maritalStatus === 'divorcee'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-d">${
                              employeeDetails.maritalStatus === 'widower'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-f">${
                              employeeDetails.maritalStatus === 'separated'
                                ? 'x'
                                : ''
                            }</div>
                        </div>
                        <div class="box-c">
                            <div class="x-a">${
                              employeeDetails.israeliResident === 'yes'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-b">${
                              employeeDetails.israeliResident === 'no'
                                ? 'x'
                                : ''
                            }</div>
                        </div>
                        <div class="box-d">
                            <div class="x-a">${
                              employeeDetails.memberKibbutzOrMoshav === 'yes'
                                ? 'x'
                                : ''
                            }</div>
                            <div class="x-b">${
                              employeeDetails.memberKibbutzOrMoshav === 'no'
                                ? 'x'
                                : ''
                            }</div>
                        </div>
                        <div class="box-e">
                            <div class="x-a">${
                              employeeDetails.HMOMember === 'no' ? 'x' : ''
                            }</div>
                            <div class="x-b">${
                              employeeDetails.HMOMember === 'yes' ? 'x' : ''
                            }</div>
                            <div class="HMO">${
                              employeeDetails.HMOMember === 'yes'
                                ? employeeDetails.HMOEM
                                : ''
                            }</div>
                        </div>
                    </div>
                    <div class="line-d">
                        <div class="email">${employeeDetails.email || ''}</div>
                        <div class="phone-home">${
                          employeeDetails.phone || ''
                        }</div>
                        <div class="phone">${
                          employeeDetails.anotherPhone || ''
                        }</div>
                    </div>
                </div>


                <!-- פרטים על הילדים (מתחת לגיל 19) -->
                <div class="children">
                   ${children[0] !== null ? childrenTamplate(children) : ''} 
                </div>

                <!-- פרטים על ההכנסות ממעביד זה -->
                <div class="employer-income">
                    <div class="left">
                        <div>${
                          incomeFromThisEmployer?.monthlySalary ? 'x' : ' '
                        } </div>
                        <div>${
                          incomeFromThisEmployer?.extraSalary ? 'x' : ' '
                        } </div>
                        <div>${
                          incomeFromThisEmployer?.PartialSalary ? 'x' : ' '
                        } </div>
                        <div>${
                          incomeFromThisEmployer?.salary ? 'x' : ' '
                        } </div>
                        <div>${
                          incomeFromThisEmployer.allowance ? 'x' : ' '
                        } </div>
                        <div>${
                          incomeFromThisEmployer.scholarship ? 'x' : ' '
                        } </div>
                    </div>
                    <div class="right-date">${
                      incomeFromThisEmployer['start-workDay']
                        ? `${plusZiro(
                            incomeFromThisEmployer['start-workDay']
                          )}${plusZiro(
                            incomeFromThisEmployer['start-workMonth']
                          )}${incomeFromThisEmployer['start-workYear']}`
                        : ''
                    }</div>
                </div>

                <!-- פרטים על הכנסות אחרות -->
                <div class="other-incomes">
                    <div class="a">${
                      otherIncomes.incomesSalaryOhter === 'false' ? 'x' : ''
                    }</div>
                    <div class="aa">${
                      otherIncomes.incomesSalaryOhter === 'true' ? 'x' : ''
                    }</div>
                    <div class="line">
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.monthlySalary
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.salary
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                    </div>
                    <div class="line">
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.extraSalary
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.allowance
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                    </div>
                    <div class="line">
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.PartialSalary
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                        <div>${
                          otherIncomes.incomesSalaryOhter === 'true'
                            ? otherIncomes.scholarship
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                    </div>
                    <div class="b">${
                      otherIncomes.incomesSalaryOhter === 'true'
                        ? otherIncomes.acceptAgainstMyIncome === 'no'
                          ? 'x'
                          : ''
                        : ''
                    }</div>
                    <div class="c">${
                      otherIncomes.incomesSalaryOhter === 'true'
                        ? otherIncomes.acceptAgainstMyIncome === 'yes'
                          ? 'x'
                          : ''
                        : ''
                    }</div>
                    <div class="d">${
                      otherIncomes.incomesSalaryOhter === 'true'
                        ? otherIncomes.setAsideAgainstMyOtherIncome
                          ? 'x'
                          : ''
                        : ''
                    }</div>
                    <div class="e">${
                      otherIncomes.incomesSalaryOhter === 'true'
                        ? otherIncomes.setAsideAgainstLoss
                          ? 'x'
                          : ''
                        : ''
                    }</div>
                </div>

                <!-- פרטים על בן/בת הזוג -->
                <div class="partner">
                    <div class="line">
                        <div class="id">${
                          partner.idByPartner === 'id' || !partner.idByPartner
                            ? partner['id-employee'] || ''
                            : ''
                        }</div>
                        <div class="fameli">${partner.lastName || ''}</div>
                        <div class="name">${partner.firstName || ''}</div>
                        <div class="date-of-birth">${
                          partner.birthDay
                            ? `${plusZiro(partner.birthDay)}${plusZiro(
                                partner.birthMonth
                              )}${partner.birthYear}`
                            : ''
                        }</div>
                        <div class="date-increase">${
                          partner.increaseDay
                            ? `${plusZiro(partner.increaseDay)}${plusZiro(
                                partner.increaseMonth
                              )}${partner.increaseYear}`
                            : ''
                        }</div>
                    </div>
                    <div class="line">
                        <div class="passport">${
                          partner.idByPartner === 'passport'
                            ? partner['id-employee'] || ''
                            : ''
                        }</div>
                        <div class="a">${
                          partner.partnerIncome === 'false' ? 'x' : ''
                        }</div>
                        <div class="b">${
                          partner.partnerIncome === 'true' ? 'x' : ''
                        }</div>
                        <div class="c">${
                          partner.partnerIncome === 'true'
                            ? partner.partnerIncomeType === 'WorkOrOhther'
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                        <div class="d">${
                          partner.partnerIncome === 'true'
                            ? partner.partnerIncomeType === 'otherIncome'
                              ? 'x'
                              : ''
                            : ''
                        }</div>
                    </div>
                </div>
                
                <!-- שינוים במהלך השנה -->
                <!-- 👆 כרגע לא רלוונטי מכיוון שזה טופס ממוחשב -->
            </div>

            
            <div class="page-b">
                <img src="${imgB()}" class="img-background" alt="">
                <!-- דף 2 -->
                <!-- פטור או זיכוי ממס -->

                <!-- מספר זהות (ראש דף 2) -->
                <div class="id-num">${
                  employeeDetails['id-employee'] || ''
                }</div>

                <!-- תושב ישראל -->
                <div class="israeli-resident">${
                  employeeDetails.israeliResident === 'yes' ? 'x' : ''
                }</div>

                <!-- נכות -->
                <div class="disability">${
                  taxExemptionOrCredit.handicapped ? 'x' : ''
                }</div>
                
                <!-- תושב קבוע ביישוב מזכה -->
                <div class="in-a-qualifying-localityt">
                    <span>${
                      taxExemptionOrCredit.permanentResident ? 'x' : ''
                    }</span>
                    <div class="date">${
                      taxExemptionOrCredit.permanentResident
                        ? taxExemptionOrCredit['permanentResident-from-dateDay']
                          ? `${plusZiro(
                              taxExemptionOrCredit[
                                'permanentResident-from-dateDay'
                              ]
                            )}/${plusZiro(
                              taxExemptionOrCredit[
                                'permanentResident-from-dateMonth'
                              ]
                            )}/${
                              taxExemptionOrCredit[
                                'permanentResident-from-dateYear'
                              ]
                            }`
                          : ''
                        : ''
                    }</div>
                    <div class="citi">${taxExemptionOrCredit.citi || ''}</div>
                </div>

                <!-- עולה חדש -->
                <div class="newcomer">
                    <div class="line">
                        <span>${
                          taxExemptionOrCredit.newImmigrant ? 'x' : ''
                        }</span>
                        <div class="from-date">${
                          taxExemptionOrCredit.newImmigrant
                            ? employeeDetails.increaseDay
                              ? `${plusZiro(
                                  employeeDetails.increaseDay
                                )}/${plusZiro(employeeDetails.increaseMonth)}/${
                                  employeeDetails.increaseYear
                                }`
                              : ''
                            : ''
                        }</div>
                    </div>
                    <div class="until-date">${
                      taxExemptionOrCredit.newImmigrant
                        ? taxExemptionOrCredit['newImmigrant-no-incomeDay']
                          ? `${plusZiro(
                              taxExemptionOrCredit['newImmigrant-no-incomeDay']
                            )}/${plusZiro(
                              taxExemptionOrCredit[
                                'newImmigrant-no-incomeMonth'
                              ]
                            )}/${
                              taxExemptionOrCredit['newImmigrant-no-incomeYear']
                            }`
                          : ''
                        : ''
                    }</div>
                </div>

                <!-- בגין בן/בת הזוג ללא הכנסה -->
                <div class="partner-no-mony">${
                  taxExemptionOrCredit['partner-non-income'] ? 'x' : ''
                }</div>

                <!-- חד הורי (חי בנפרד) -->
                <div class="one-parent">${
                  taxExemptionOrCredit['one-parent'] ? 'x' : ''
                }</div>

                <!-- בגין הילדים שבחזקתי -->
                <div class="my-kids">
                    <div class="x">${
                      taxExemptionOrCredit['kids-whit-me'] ? 'x' : ''
                    }</div>
                    <div class="line">
                        <div class="box-a">
                            <span>${
                              taxExemptionOrCredit['kids-whit-me'] &&
                              taxExemptionOrCredit['kidsWhitMe-bornt-this-year']
                                ? 'x'
                                : ''
                            }</span>
                            <div class="num">${
                              taxExemptionOrCredit['kids-whit-me']
                                ? taxExemptionOrCredit[
                                    'kidsWhitMe-bornt-this-year'
                                  ] || ''
                                : ''
                            }</div>
                        </div>
                        <div class="box-b">
                            <span>${
                              taxExemptionOrCredit['kids-whit-me'] &&
                              taxExemptionOrCredit[
                                'kidsWhitMe-u6-u17-this-year'
                              ]
                                ? 'x'
                                : ''
                            }</span>
                            <div class="num">${
                              taxExemptionOrCredit['kids-whit-me']
                                ? taxExemptionOrCredit[
                                    'kidsWhitMe-u6-u17-this-year'
                                  ] || ''
                                : ''
                            }</div>
                        </div>
                        </div>
                        <div class="line">
                        <div class="box-c">
                            <span>${
                              taxExemptionOrCredit['kids-whit-me'] &&
                              taxExemptionOrCredit['kidsWhitMe-u5-this-year']
                                ? 'x'
                                : ''
                            }</span>
                            <div class="num">${
                              taxExemptionOrCredit['kids-whit-me']
                                ? taxExemptionOrCredit[
                                    'kidsWhitMe-u5-this-year'
                                  ] || ''
                                : ''
                            }</div>
                        </div>
                        <div class="box-d">
                            <span>${
                              taxExemptionOrCredit['kids-whit-me'] &&
                              taxExemptionOrCredit['kidsWhitMe-u18-this-year']
                                ? 'x'
                                : ''
                            }</span>
                            <div class="num">${
                              taxExemptionOrCredit['kids-whit-me']
                                ? taxExemptionOrCredit[
                                    'kidsWhitMe-u18-this-year'
                                  ] || ''
                                : ''
                            }</div> 
                        </div>
                    </div>
                </div>

                <!-- בגין הילדים הפעוטים -->
                <div class="litile-kids">
                    <div class="x">${
                      taxExemptionOrCredit['little-kids'] ? 'x' : ''
                    }</div>
                    <div class="table">
                        <div class="line-a">
                            <div class="a-x">${
                              taxExemptionOrCredit['little-kids'] &&
                              taxExemptionOrCredit['littleKids-new-kids']
                                ? 'x'
                                : ''
                            }</div>
                            <div class="num">${
                              taxExemptionOrCredit['little-kids'] &&
                              taxExemptionOrCredit['littleKids-new-kids']
                                ? taxExemptionOrCredit['littleKids-new-kids'] ||
                                  ''
                                : ''
                            }</div>
                        </div>
                        <div class="line-b">
                            <div class="b-x">${
                              taxExemptionOrCredit['little-kids'] &&
                              taxExemptionOrCredit['littleKids-five-years-ago']
                                ? 'x'
                                : ''
                            }</div>
                            <div class="num">${
                              taxExemptionOrCredit['little-kids'] &&
                              taxExemptionOrCredit['littleKids-five-years-ago']
                                ? taxExemptionOrCredit[
                                    'littleKids-five-years-ago'
                                  ] || ''
                                : ''
                            }</div>
                        </div>
                    </div>
                </div>

                <!-- הורה יחיד לילדים שבחזקתי -->
                <div class="one-parent-whitme">${
                  taxExemptionOrCredit[
                    'I-am-a-single-parent-to-my-children-in-my-custody'
                  ]
                    ? 'x'
                    : ''
                }</div>

                <!-- בגין הילדים שאינם בחזקתי -->
                <div class="one-parent-whitme-mony">${
                  taxExemptionOrCredit['children-who-are-not-in-my-possession']
                    ? 'x'
                    : ''
                }</div>

                <!-- (מתחת 19) הורה לילדים עם מוגבלויות -->
                <div class="parent-u19">
                    <span>${
                      taxExemptionOrCredit['children-with-disabilities']
                        ? 'x'
                        : ''
                    }</span>
                    <div class="num">${
                      taxExemptionOrCredit['children-with-disabilities']
                        ? taxExemptionOrCredit[
                            'children-with-disabilities-num-kids-disabilities-u19'
                          ] || ''
                        : ''
                    }</div>
                </div>

                <!-- בגין תשלום מזונות -->
                <div class="mony-partner">${
                  taxExemptionOrCredit['alimony-ex'] ? 'x' : ''
                }</div>

                <!-- אני בגיל שבין 16 - ל-18 -->
                <div class="kid-u16-u18">${
                  taxExemptionOrCredit['my-partner-is-u16'] ? 'x' : ''
                }</div>

                <!-- חייל משוחרר -->
                <div class="soldier">
                    <div>${taxExemptionOrCredit['im-soldier'] ? 'x' : ''}</div>
                    <div class="from-date">${
                      taxExemptionOrCredit['im-soldier']
                        ? taxExemptionOrCredit['im-soldier-start-serviceDay']
                          ? `${plusZiro(
                              taxExemptionOrCredit[
                                'im-soldier-start-serviceDay'
                              ]
                            )}/${plusZiro(
                              taxExemptionOrCredit[
                                'im-soldier-start-serviceMonth'
                              ]
                            )}/${
                              taxExemptionOrCredit[
                                'im-soldier-start-serviceYear'
                              ]
                            }`
                          : ''
                        : ''
                    }</div>
                    <div class="end-date">${
                      taxExemptionOrCredit['im-soldier']
                        ? taxExemptionOrCredit['im-soldier-finish-serviceDay']
                          ? `${plusZiro(
                              taxExemptionOrCredit[
                                'im-soldier-finish-serviceDay'
                              ]
                            )}/${plusZiro(
                              taxExemptionOrCredit[
                                'im-soldier-finish-serviceMonth'
                              ]
                            )}/${
                              taxExemptionOrCredit[
                                'im-soldier-finish-serviceYear'
                              ]
                            }`
                          : ''
                        : ''
                    }</div>
                </div>

                <!-- סיום לימודים אקדמאים -->
                <div class="graduation">${
                  taxExemptionOrCredit['collegeDegree'] ? 'x' : ''
                }</div>
    




                <!-- תיאום מס -->
                <div class="tax-coordination">
                    <div class="line-a">${
                      taxCoordination.taxCoordination &&
                      taxCoordination.taxCoordinationIncome === 'no'
                        ? 'x'
                        : ''
                    }</div>
                    <div class="line-b">
                        <div class="x">${
                          taxCoordination.taxCoordination &&
                          taxCoordination.taxCoordinationIncome === 'yes'
                            ? 'x'
                            : ''
                        }</div>
                        <div class="table">
                            ${
                              taxCoordination.taxCoordination &&
                              taxCoordination.taxCoordinationIncome === 'yes'
                                ? taxCoordinationTR(taxCoordination.array)
                                : ''
                            }
                        </div>
                    </div>
                    <div class="line-c">${
                      taxCoordination.taxCoordination &&
                      taxCoordination.taxCoordinationIncome === 'official'
                        ? 'x'
                        : ''
                    }</div>
                </div>
                <!-- הצהרה -->
                <div class="disclaimer">
                    <div class="date">${date.format('DD/MM/YYYY')}</div>
                    <div class="signature">${
                      statementAndSignature
                        ? `<img src="${statementAndSignature}" alt=""/>`
                        : ''
                    }</div>
                </div>
            </img>
        </div>
    </body>
    
    </html>`;
};

function plusZiro(num) {
  let n = parseFloat(num);
  if (n <= 9) {
    return `0${n}`;
  } else {
    return n;
  }
}

function childrenTamplate(children) {
  let child = ``;

  children.forEach((e) => {
    if (e !== null)
      child += `
        <div class="line">
        <div class="box-a">${
          e ? (e.myKidPossession === true ? 'x' : '') : ''
        }</div>
        <div class="box-b">${e ? (e.kidsPension === true ? 'x' : '') : ''}</div>
        <div class="box-c">${e ? e.name : ''}</div>
        <div class="box-d">${e ? e['id-employee'] : ''}</div>
        <div class="box-e">${
          e['date-day']
            ? `${plusZiro(e['date-day'])}${plusZiro(e['date-month'])}${
                e['date-year']
              }`
            : ''
        }</div>
    </div>
        `;
  });
  return child;
}

function taxCoordinationTR(array) {
  let tr = ``;

  array.forEach((e) => {
    if (e !== null)
      tr += `
       <div class="tr">
            <div class="td-a">${e['name-income'] || ''}</div>
            <div class="td-b">${e['address-income'] || ''}</div>
            <div class="td-c">${e['deductions-portfolio'].slice(1) || ''}</div>
            <div class="td-d">${e['type-of-income'] || ''}</div>
            <div class="td-e">${e['monthly-income'] || ''}</div> 
            <div class="td-f">${e['the-tax-deducted'] || ''}</div>
        </div>
        `;
  });
  return tr;
}

const style = `<style>
html,
body {
  width: 831.48px;
  height: 2352.94px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background-color: #333; */
}
.app {
  width: 100%;
  height: 100%;
}
.border{
    border: 1px solid red;
    box-sizing: border-box;
}
.page-a {
  width: 100%;
  height: 50%;
  position: relative;
}
.page-b {
  width: 100%;
  height: 50%;
  position: relative;
}
.img-background {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
.app {
  color: #4950ae;
  font-family: sans-serif;
  font-size: 20px;
  overflow: hidden;
}
*,
html,
body {
  box-sizing: border-box;
}
.page-a .tax-year {
  padding: 118px 0 0px 314px;
  letter-spacing: 10px;
  font-size: 20px;
}

/* פרטי המעביד */
.employer-information {
  width: 86%;
  height: 37px;
  text-align: center;
  margin: 90px 0px 0 40px;
}

.employer-information .name {
  float: right;
  width: 24.5%;
  min-height: 100%;
}
.employer-information .adres {
  float: right;
  width: 40.5%;
  min-height: 100%;
}
.employer-information .phone {
  font-size: 15px;
  float: right;
  width: 15.4%;
  line-height: 31px;
  min-height: 100%;
}
.employer-information .file-num {
  letter-spacing: 5px;
  float: right;
  width: 19.5%;
  line-height: 32px;
  padding-left: 18px;
  font-size: 17px;
  min-height: 100%;
}
/* ----------- פרטי המעביד -------- */

/* פרטי העובד  */
/* line A */
.employee-details {
  width: 86%;
  margin: 26px 0 0 39px;
  height: 165px;
  text-align: center;
}
.employee-details .line-a {
  width: 100%;
  height: 36px;
  padding-top: 19px;
  font-size: 0.8em;
}
.employee-details .line-a > div {
  float: right;
  height: 100%;
}
.employee-details .line-a .num-id {
  width: 20%;
  letter-spacing: 5.5px;
  padding-left: 3px;
}
.employee-details .line-a .famely {
  width: 24.1%;
}
.employee-details .line-a .name {
  width: 20.3%;
}
.employee-details .line-a .date-of-birth {
  width: 17.3%;
  letter-spacing: 5.5px;
}
.employee-details .line-a .date-increase {
  width: 18%;
  letter-spacing: 5.5px;
}

/* line B */
.employee-details .line-b {
  width: 100%;
  height: 29px;
  font-size: 0.8em;
  margin-top: 13px;
}
.employee-details .line-b .privet-adres > div,
.employee-details .line-b > div {
  float: right;
  height:19px;
}
.employee-details .line-b .passport {
  width: 28.4%;
  margin-top: 10px;
  letter-spacing: 5.5px;
  padding-left: 0px;
}
.employee-details .line-b .privet-adres {
  width: 71%;
}
.employee-details .line-b .privet-adres .adres {
  width: 45%;
}
.employee-details .line-b .privet-adres .num {
  width: 7.1%;
}
.employee-details .line-b .privet-adres .citi {
  width: 26%;
}
.employee-details .line-b .privet-adres .postal-code {
  width: 21.6%;
  letter-spacing: 5.5px;
}

/* line C */
.employee-details .line-c {
  width: 100%;
  height: 54px;
  margin-top: 1px;
  font-size: 16px;
}
.employee-details .line-c .box-a,
.employee-details .line-c .box-b,
.employee-details .line-c .box-c,
.employee-details .line-c .box-d,
.employee-details .line-c .box-e {
  height: 100%;
  float: right;
}
.employee-details .line-c .box-a {
  width: 10%;
  height: 53px;
  font-size: 16px;
  line-height: 0px;
}
.employee-details .line-c .box-b {
  width: 36%;
}
.employee-details .line-c .box-c {
  width: 12%;
}
.employee-details .line-c .box-d {
  width: 19.5%;
}
.employee-details .line-c .box-e {
  width: 22.5%;
}
.employee-details .line-c .box-a .x-a {
  float: right;
  margin: 23px 15px 0px 0;
  text-align: end;
  width: 79%;
}
.employee-details .line-c .box-a .x-b {
  float: right;
  margin: -2px 15px -5px 0;
  text-align: end;
  width: 79%;
  line-height: 41px;
}
.employee-details .line-c .box-b > div {
  float: right;
  height: 27px;
  text-align: end;
  line-height: 43px;
}
.employee-details .line-c .box-b .x-a {
  width: 39%;
  float: right;
  padding-right: 12px;
}
.employee-details .line-c .box-b .x-b {
  width: 36.8%;
}
.employee-details .line-c .box-b .x-c {
  width: 24%;
}
.employee-details .line-c .box-b .x-d {
  width: 32.4%;
  line-height: 24px;
  padding-right: 12px;
}
.employee-details .line-c .box-b .x-f {
  line-height: 25px;
}
.employee-details .line-c .box-c .x-a {
  height: 60%;
  padding: 14px 0 0px 19px;
}
.employee-details .line-c .box-c .x-b {
  padding: 0px 0 0px 19px;
}
.employee-details .line-c .box-d .x-a {
  height: 60%;
  padding: 14px 0 0px 22px;
}
.employee-details .line-c .box-d .x-b {
  padding: 0px 0 0px 21px;
}
.employee-details .line-c .box-e .x-a {
  height: 60%;
  text-align: end;
  padding: 11px 12px 0 0;
}
.employee-details .line-c .box-e .x-b {
  width: 21%;
  margin-top: -3px;
  float: right;
}
.employee-details .line-c .box-e .HMO {
    margin-left: 8px;
    width: 60px;
    font-size:0.8em;
    text-align: center;
}

/* line D */

.employee-details .line-d {
  width: 100%;
  height: 30px;
}
.employee-details .line-d > div {
  float: right;
  height: 31px;
  font-size: 12px;
  line-height: 44px;
}
.employee-details .line-d .email {
  width: 35%;
}
.employee-details .line-d .phone-home {
  width: 30.5%;
}
.employee-details .line-d .phone {
  width: 34.5%;
}
/* ----------- פרטי העובד -------- */

/* פרטים על הילדים (מתחת לגיל 19) */
.children {
  float: right;
  width: 47.8%;
  height: 35.7%;
  margin: 50px 77px 0 0;
  padding-top: 22px;
  text-align: center;
  font-size: 14px;
}
.children .line {
  width: 100%;
  height: 30.5px;
}
.children .line > div {
  float: right;
  line-height: 48px;
  height: 100%;
}
.children .line .box-a {
  width: 3.4%;
}
.children .line .box-b {
  width: 3.6%;
}
.children .line .box-c {
  width: 25.3%;
}
.children .line .box-d {
  width: 35.5%;
  letter-spacing: 6.5px;
  padding-left: 4px;
}
.children .line .box-e {
  width: 32%;
  letter-spacing: 6.5px;
  padding-left: 3px;
}
/*------- פרטים על הילדים (מתחת לגיל 19)  -----------*/

/* פרטים על ההכנסות ממעביד זה  */

.employer-income {
  float: left;
  margin: 25px 0 0 40px;
  width: 37%;
  height: 10%;
}
.employer-income .left {
  float: right;
  width: 4.5%;
  font-size: 15px;
  padding-top: 12px;
  height: 97%;
  flex-direction: column;
  justify-content: space-around;
}
.employer-income .left > div {
  margin-top: -0.2px;
  height: calc(97% / 6);
}
.employer-income .right-date {
  float: left;
  height: 29px;
  width: 41%;
  margin: 33px 0px 0 3px;
  font-size: 16px;
  line-height: 42px;
  letter-spacing: 5.5px;
  padding-left: 3px;
}
/* --------- פרטים על ההכנסות ממעביד זה -------------- */

/* פרטים על הכנסות אחרות */
.other-incomes {
  width: 37%;
  margin: 170px 0 0 39px;
  height: 25.6%;
  font-size: 16px;
}
.other-incomes .aa,
.other-incomes .a {
  padding-right: 8px;
  padding-top: 2px;
  text-align: end;
  height: 8.8%;
}
.other-incomes .aa {
  line-height: 33px;
}
.other-incomes .line {
  width: 100%;
  height: 16px;
}
.other-incomes .line > div {
  width: 50%;
  text-align: end;
  height: 16px;
  float: right;
  padding-right: 8px;
  line-height: 15px;
}
.other-incomes .line :last-child {
  padding-right: 18px;
}
.other-incomes .c,
.other-incomes .d,
.other-incomes .b {
  height: 34px;
  text-align: end;
  padding: 15px 9px 0 0;
}
.other-incomes .e {
  height: 16%;
  text-align: end;
  padding: 28px 9px 0 0;
}
/* ---------- פרטים על הכנסות אחרות----------  */

/* פרטים על בן/בת הזוג */
.partner {
  width: 86.4%;
  margin: 30px 0 0 40px;
}
.partner .line {
  width: 100%;
  height: 34px;
  font-size: 0.9em;
}
.partner .line > div {
  float: right;
  text-align: center;
  height: 100%;
  line-height: 49px;
}
.partner .line .id {
  width: 20.5%;
  letter-spacing: 4.7px;
  padding-left: 0px;
}
.partner .line .fameli {
  width: 24%;
}
.partner .line .name {
  width: 20.1%;
}
.partner .line .date-of-birth {
  width: 17.8%;
  letter-spacing: 5.7px;
  font-size: 15px;
  padding-left: 6px;
}
.partner .line .date-increase {
  width: 17.4%;
  letter-spacing: 6.1px;
  font-size: 15px;
  padding-left: 2px;
}

.partner .passport {
  width: 23.6%;
  letter-spacing: 3.7px;
  font-size: 14px;
  padding: 0;
  line-height: 52px !important;
}
.partner .a {
  width: 23.5%;
  height: 100%;
  text-align: right !important;
  line-height: 0px !important;
  padding: 12px 8px 0 0;
  font-size: 15px;
}
.partner .b {
  width: 25%;
  text-align: right !important;
  padding: 12px 16px 0 0;
  line-height: 1px !important;
  font-size: 15px;
}
.partner .c {
  width: 15.5%;
  text-align: end !important;
  line-height: 3px !important;
  padding: 12px 8px 0 0;
  font-size: 15px;
}
.partner .d {
  width: 11.5%;
  text-align: end !important;
  line-height: 3px !important;
  padding: 11px 8px 0 0;
  font-size: 15px;
}
/* ------ פרטים על בן/בת הזוג  ------ */
/* מספר זהות (ראש דף 2) */
.id-num {
  margin: 0 0 0 16%;
  padding-top: 20px;
  font-size: 17px;
  height: 40px;
  width: 12.8%;
  text-align: center;
}
/* ---- מספר זהות (ראש דף 2) ----  */

/* תושב ישראל  */
.israeli-resident {
  margin: 29px 0 0 39px;
  width: 86%;
  height: 22px;
  text-align: end;
  padding-right: 32px;
  font-size: 17px;
}
/* ---- תושב ישראל ----- */

/* נכות */
.disability {
  margin: 0px 0 0 38px;
  width: 86%;
  height: 35px;
  text-align: end;
  padding-right: 31px;
  font-size: 17px;
}
/* ---- נכות ---- */

/*  תושב קבוע ביישוב מזכה  */
.in-a-qualifying-localityt {
  margin: 0px 0 0 40px;
  width: 86%;
  height: 39px;
  text-align: end;
  padding-right: 29px;
  font-size: 15px;
}
.in-a-qualifying-localityt span {
  padding: 0px 4px 1px 0;
  font-size: 16px;
  line-height: 23px;
}
.in-a-qualifying-localityt .date {
  width: 15.5%;
  float: left;
  margin-left: 46%;
  padding-top: 4px;
  text-align: center;
  font-size: 15px;
}
.in-a-qualifying-localityt .citi {
  width: 29.5%;
  margin-left: 54.5%;
  text-align: center;
  padding-top: 0px;
}
/* -- תושב קבוע ביישוב מזכה -- */

/* עולה חדש  */
.newcomer {
  margin: 0px 0 0 40px;
  width: 86%;
  height: 72px;
  text-align: end;
  padding-right: 26px;
  font-size: 16px;
  line-height: 18px;
}
.newcomer .line {
  width: 100%;
  height: 24px;
}
.newcomer .line span {
  float: right;
  padding: 1px 4px 0 0;
}
.newcomer .from-date {
  float: right;
  text-align: center;
  margin: 0 21.5% 0 0;
  width: 16%;
  padding: 7px 0 0 0;
  font-size: 0.8em;
}
.until-date {
  width: 12%;
  margin: 0px 0 0 33%;
  font-size: 13px;
  text-align: center;
  padding-top: 1px;
}
/* ---- עולה חדש ---- */
/* בגין בן/בת הזוג ללא הכנסה */
.partner-no-mony {
  height: 33px;
  width: 85.7%;
  font-size: 16px;
  margin: 0 0 0 4.7%;
  padding: 0px 28px 0px 0;
  line-height: 17px;
  text-align: end;
}
.one-parent {
  padding: 0px 28px 0px 0;
  line-height: 15px;
  text-align: end;
  height: 32px;
  font-size: 16px;
  width: 85.7%;
  margin: 0 0 0 4.7%;
}
/* ----- בגין בן/בת הזוג ללא הכנסה---- */

/* בגין הילדים שבחזקתי */
.my-kids {
  width: 85.8%;
  margin: 0px 0 0 4.7%;
  height: 65px;
}
.my-kids .x {
  padding: 0px 28px 0px 0px;
  width: 100%;
  text-align: end;
  line-height: 17px;
  height: 30px;
  font-size: 16px;
}
.my-kids .line {
  height: 18px;
  width: 99%;
  margin-left: 0.8%;
  font-size: 14px;
  text-align: end;
}
.my-kids .line > div {
  width: 49%;
}
.my-kids .line .box-a {
  padding-right: 47px;
  float: right;
}
.my-kids .line .box-a .num {
  float: left;
  margin-left: 38%;
  width: 11%;
  padding-top: 1px;
  font-size: 13px;
  text-align: center;
}
.my-kids .line .box-b {
  padding-right: 25px;
  float: left;
}
.my-kids .line .box-b .num {
  float: left;
  margin-left: 3%;
  width: 11%;
  text-align: center;
}
.my-kids .line .box-c {
  padding-right: 46px;
  padding-top: 0px;
  float: right;
}
.my-kids .line .box-c .num {
  float: left;
  margin-left: -3%;
  width: 9%;
  padding-top: 0px;
  text-align: center;
}
.my-kids .line .box-d {
  padding-right: 25px;
  font-size: 11px;
  float: left;
}
.my-kids .line .box-d .num {
  float: left;
  margin-left: 21%;
  width: 10%;
  padding-top: 3px;
  text-align: center;
}
/* ---- בגין הילדים שבחזקתי ------ */

/* בגין הילדים הפעוטים */
.litile-kids {
  width: 85.8%;
  margin: -1px 0 0 4.7%;
  height: 54px;
}
.litile-kids .x {
  padding: 0px 29px 0px 0px;
  width: 100%;
  text-align: end;
  line-height: 18px;
  font-size: 0.8em;
  height: 14px;
}
.litile-kids .table {
  height: 36px;
  width: 100%;
  margin-top: 6px;
}
.litile-kids .line-a,
.litile-kids .line-b {
  height: 50%;
}
.litile-kids .table .line-a .a-x {
  width: 28.5%;
  text-align: end;
  float: right;
  padding-right: 47px;
  font-size: 12px;
}
.litile-kids .table .line-a .num {
  float: right;
  width: 5%;
  text-align: center;
  font-size: 14px;
}
.litile-kids .table .line-b .b-x {
  float: right;
  width: 45.5%;
  text-align: end;
  padding-right: 47px;
  margin-top: -2px;
  font-size: 12px;
}
.litile-kids .table .line-b .num {
  width: 5%;
  float: right;
  text-align: center;
  font-size: 14px;
}

/* ------ בגין הילדים הפעוטים ----- */

/* הורה יחיד לילדים שבחזקתי */
.one-parent-whitme {
  width: 85.8%;
  margin: -1px 0 0 4.7%;
  height: 25px;
  text-align: end;
  padding: 2px 29px 0 0;
  font-size: 0.8em;
}
/* ---- הורה יחיד לילדים שבחזקתי ---- */

/* בגין הילדים שאינם בחזקתי */
.one-parent-whitme-mony {
  width: 85.8%;
  margin: -1px 0 0 4.7%;
  height: 36px;
  text-align: end;
  padding: 4px 28px 0 0;
  font-size: 0.8em;
}
/* ---- בגין הילדים שאינם בחזקתי  ---- */

/* (מתחת 19) הורה לילדים עם מוגבלויות */
.parent-u19 {
  width: 85.8%;
  margin: 0px 0 0 4.7%;
  height: 37px;
  text-align: end;
  padding: 3.5px 29px 0 0;
  font-size: 0.8em;
}
.parent-u19 .num {
  float: left;
  width: 3%;
  text-align: center;
  font-size: 0.8em;
  margin-left: 86.4%;
  padding-top: 0px;
}
/* ---(מתחת 19) הורה לילדים עם מוגבלויות----- */

/* בגין תשלום מזונות */
.mony-partner {
  width: 85.8%;
  margin: 1px 0 0 4.7%;
  height: 21px;
  text-align: end;
  padding: 0.6px 29px 0 0;
  line-height: 14px;
  font-size: 0.8em;
}
/* ---- בגין תשלום מזונות -----*/

/* אני בגיל שבין 16 - ל-18 */
.kid-u16-u18 {
  width: 85.8%;
  margin: 0px 0 0 4.7%;
  height: 22px;
  text-align: end;
  padding: 3px 28px 0 0;
  line-height: 16px;
  font-size: 0.8em;
}
/*----- אני בגיל שבין 16 - ל-18 ----*/

/* חייל משוחרר */
.soldier {
  width: 85.8%;
  margin: -3px 0 0 4.7%;
  height: 38px;
  text-align: end;
  padding: 0.7px 27.5px 0 0;
  line-height: 25px;
  font-size: 0.8em;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.soldier div {
  width: 54.1%;
  float: right;
  padding-right: 2px;
}
.soldier .from-date {
  float: right;
  width: 11.7%;
  text-align: center;
  font-size: 12px;
  margin-left: 15%;
  padding-top: 2px;
}
.soldier .end-date {
  float: right;
  width: 12.6%;
  text-align: center;
  font-size: 12px;
  margin-left: 6.5%;
  padding-top: 2px;
}
/*----- חייל משוחרר -----*/

/* סיום לימודים אקדמאים */
.graduation {
  width: 85.8%;
  margin: 0px 0 0 4.7%;
  height: 26px;
  text-align: end;
  padding: 3px 28px 0 0;
  line-height: 13px;
  font-size: 0.8em;
}
/*---- סיום לימודים אקדמאים----- */

/*  תיאום מס */
.tax-coordination {
  width: 85.8%;
  margin: 32px 0 0 4.7%;
  height: 15.2%;
  text-align: end;
  line-height: 12px;
  font-size: 16px;
}
.tax-coordination .line-a {
  padding: 0px 26px 0 0;
  height: 40px;
  line-height: 12px;
}
.tax-coordination .line-b {
  height: 117px;
}
.tax-coordination .line-b .x {
  padding-right: 26px;
  height: 12px;
}
.tax-coordination .line-b .table {
  width: 100%;
  height: 56%;
  margin-top: 38px;
}
.tax-coordination .line-b .table .tr {
  height: 22px;
  text-align: center;
  font-size: 12px;
  line-height: 22px;
}
.tax-coordination .line-b .table .tr > div{
  height:100%;
}
.tax-coordination .line-b .table .tr .td-a {
  width: 18.5%;
  float: right;
}
.tax-coordination .line-b .table .tr .td-b {
  width: 26.4%;
  float: right;
}
.tax-coordination .line-b .table .tr .td-c {
  width: 15.3%;
  float: right;
}
.tax-coordination .line-b .table .tr .td-d {
  width: 11.5%;
  float: right;
}
.tax-coordination .line-b .table .tr .td-e {
  width: 14%;
  float: right;
}
.tax-coordination .line-b .table .tr .td-f {
  width: 14.1%;
  float: right;
}
.tax-coordination .line-c {
  padding: 0px 27px 0 0;
  height: 18px;
  font-size: 15px;
}
/* ---- תיאום מס ---- */


/* הצהרה */
.disclaimer {
    width: 34%;
    margin: 5.7%0 0 4.7%;
    height: 2.4%;
    direction: rtl;
    float: left;
  }
  .disclaimer .signature {
    width: 89px;
    float: right;
    margin: 0 30px 0 0;
    height: auto;
    transform: rotate(180deg);
    padding-top: 7px;
  }
  .disclaimer .signature img {
    width: 100%;
    transform: rotate(180deg);
  }
  .disclaimer .date {
    text-align: center;
    float: right;
    font-size: 13px;
    width: 46%;
    padding-top: 11px;
    display: inline-block;
  }
/* ---- הצהרה ---- */
</style>`;
