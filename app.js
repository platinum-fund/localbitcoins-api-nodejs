const API = require('./lib/api')
const rankAds = require('./lib/rank-ads')

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
  // console.log(response.data.ad_list)

  // todo: use lodash _get
  return response ? response.data.ad_list : null
}

const getOptimalAd = async conditions => {
  const list = await getAds()
  let rankedList

  if(list) {
    console.log(`Count of Ads in list: ${list.length}`)

    rankedList = rankAds(list, conditions)

    if(!rankedList[0] || rankedList[0].rank === 0)
      console.log('Nothing found by ranking criteria')
    else console.log(rankedList[0])
  }
}

// getCurrencies()
// getAds()
getOptimalAd({
  amount: 2,
  shouldEquals: {
    trade_type: 'ONLINE_BUY',
    city: ''
  }
}) // 2 BTC