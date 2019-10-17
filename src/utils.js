import moment from 'moment'

/**
 * Retrieving data from an avest USB flash drive
 */
export const getCompanyData = () => {
  window.sign('NewCompany')
  setTimeout(() => {
    const flashData = JSON.parse(decodeURIComponent(
      document.getElementById('verifiedDataNewCompany').value
    ))

    return {
      date: moment().format('DD/MM/YYYY HH:mm'),
      name: flashData.subject['2.5.4.3'] ? flashData.subject['2.5.4.3'] : 'Данные отсутствуют',
      key: flashData.cert['2.5.29.14'] ? flashData.cert['2.5.29.14'] : 'Невозможно создать цифровой ключ',
      city: (flashData.subject['2.5.4.7'] || flashData.subject['2.5.4.9']) ? flashData.subject['2.5.4.7'] + ', ' + flashData.subject['2.5.4.9'] : 'Данные отсутствуют',
      number: flashData.cert['1.2.112.1.2.1.1.1.1.2'] ? +flashData.cert['1.2.112.1.2.1.1.1.1.2'] : 'Данные отсутствуют',
      position: flashData.cert['1.2.112.1.2.1.1.5.1'] ? flashData.cert['1.2.112.1.2.1.1.5.1'] : 'Данные отсутствуют'
    }
  }, 1000)
}
