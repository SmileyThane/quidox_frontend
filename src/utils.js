import moment from 'moment'

/**
 * Retrieving data from an avest USB flash drive
 */
export const decryptionCompanyData = (data) => {

    return {
      date: moment().format('DD/MM/YYYY HH:mm'),
      name: data.verifiedData.subject['2.5.4.3'] ? data.verifiedData.subject['2.5.4.3'] : 'Данные отсутствуют',
      key: data.verifiedData.cert['2.5.29.14'] ? data.verifiedData.cert['2.5.29.14'] : 'Невозможно создать цифровой ключ',
      city: (data.verifiedData.subject['2.5.4.7'] || data.verifiedData.subject['2.5.4.9']) ? data.verifiedData.subject['2.5.4.7'] + ', ' + data.verifiedData.subject['2.5.4.9'] : 'Данные отсутствуют',
      number: data.verifiedData.cert['1.2.112.1.2.1.1.1.1.2'] ? +data.verifiedData.cert['1.2.112.1.2.1.1.1.1.2'] : 'Данные отсутствуют',
      position: data.verifiedData.cert['1.2.112.1.2.1.1.5.1'] ? data.verifiedData.cert['1.2.112.1.2.1.1.5.1'] : 'Данные отсутствуют'
    }
}

/**
 * Returns an object with data about the active company from verification hash
 * @param object
 * @returns {{address: string, org: string, unp: string, validity_to: string, name: string, validity_from: string, position: string}}
 */
export const decryptionData = object => {
  const verificationData = JSON.parse(object.verification_info)
  return {
    unp: verificationData.cert['1.2.112.1.2.1.1.1.1.2'] ? verificationData.cert['1.2.112.1.2.1.1.1.1.2'] : 'Нет данных',
    org: verificationData.subject['2.5.4.3'] ? verificationData.subject['2.5.4.3'] : 'Нет данных',
    position: verificationData.cert['1.2.112.1.2.1.1.5.1'] ? verificationData.cert['1.2.112.1.2.1.1.5.1'] : 'Нет данных',
    address: (verificationData.subject['2.5.4.7'] && verificationData.subject['2.5.4.9']) ? verificationData.subject['2.5.4.7'] + ' ' + verificationData.subject['2.5.4.9'] : 'Нет данных',
    name: (verificationData.subject['2.5.4.4'] && verificationData.subject['2.5.4.41']) ? verificationData.subject['2.5.4.4'] + ' ' + verificationData.subject['2.5.4.41'] : 'Нет данных',
    validity_from: moment(+verificationData.date[0] * 1000).format('DD/MM/YYYY, hh:mm:ss'),
    validity_to: moment(+verificationData.date[1] * 1000).format('DD/MM/YYYY, hh:mm:ss')
  }
}

/**
 * Retrieving active company
 * @param data
 * @returns {string}
 */
export const getActiveCompany = data => {
  console.log(data)
  return data.companies.find(i => i.company_id === data.active_company_id)
}

/**
 * Getting a Boolean value when checking the browser
 * @param browser
 * @returns {boolean}
 */
export const checkBrowser = browser => {
  switch (browser) {
    case 'ie': {
      return /* @cc_on!@ */!!document.documentMode
    }
    default: return true
  }
}
