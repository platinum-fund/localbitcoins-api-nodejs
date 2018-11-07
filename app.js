const API = require('./api')

const pathList = {
  CURRENCIES_URL: '/api/currencies/',
  ADS_LIST_URL: '/api/ads/',
  sellBtcCurrency: (currency, payment_method) => `/sell-bitcoins-online/${currency}/${payment_method}/.json`,
  // sellBtcCountry: (countrycode, country_name, payment_method) => `/sell-bitcoins-online/${countrycode}/${country_name}/${payment_method}/.json`
}

const getCurrencies = async () => {
  const response = await API.get(pathList.CURRENCIES_URL)
  console.log(response)
}

const getMyAds = async () => {
  const response = await API.get(pathList.ADS_LIST_URL)
  console.log(response)
}

const getAds = async () => {
  const response = await API.get( pathList.sellBtcCurrency('RUB', 'national-bank-transfer') )
  // const response = await API.get( pathList.sellBtcCountry('RU', 'Russian_Federation', 'national-bank-transfer') )
  console.log(response.data.ad_list[7])
}

// getCurrencies()
getAds()
