const API = require('./api')

const CURRENCIES_URL = 'currencies/'
const ADS_LIST_URL = 'ads/'

const getCurrencies = async () => {
  const response = await API.get(CURRENCIES_URL)
  console.log(response)
}

const getAds = async () => {
  const response = await API.get(ADS_LIST_URL)
  console.log(response)
}

// getCurrencies()
getAds()
