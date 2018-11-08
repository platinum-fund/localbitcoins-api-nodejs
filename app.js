const API = require('./lib/api')
const rankAds = require('./lib/rank-ads')

const pathList = {
  CURRENCIES_URL: '/api/currencies/',
  ADS_LIST_URL: '/api/ads/',
  sellBtcCurrency: (currency, payment_method) => `/sell-bitcoins-online/${currency}/${payment_method}/.json`,
  // sellBtcCountry: (countrycode, country_name, payment_method) => `/sell-bitcoins-online/${countrycode}/${country_name}/${payment_method}/.json`
  createContact: ad_id => `/api/contact_create/${ad_id}/`,
  releaseContact: contact_id => `/api/contact_release/${contact_id}/`
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

/**
 *
 * @param ad_id advertisement ID.
 * @param amount Amount is a number in the advertisement's fiat currency.
 * @param message Optional message to send to the advertiser.
 * @param optional ONLINE_BUY advertisements may have additional fields you need to provide depending on the advertisement's payment method (online_provider).
 * @returns {Promise<void>} Returns the API URL to the newly created contact at actions.contact_url. Whether the contact was able to be funded automatically is indicated at data.funded. Only non-floating LOCAL_SELL may return unfunded, all other trade types either fund or fail.
 */
const createContact = async (ad_id, amount, message, optional) => {
  const response = await API.post(pathList.createContact(ad_id), { amount, message, ...optional  })

  console.log(response)
}

/**
 * Releases Bitcoin trades specified by ID {contact_id}. If the release was successful a message is returned on the data key.
 * @param contact_id
 * @returns {Promise<void>}
 */
const contactRelease = async contact_id => {
  const response = await API.post(pathList.releaseContact(contact_id))

  console.log(response)
}

// getCurrencies()
// getAds()
// getOptimalAd({ amount: 2,  shouldEquals: { trade_type: 'ONLINE_BUY', city: '' } }) // 2 BTC
// createContact(873397, '45.0', 'Перевести на Qiwi', { 'details-phone_number': '+79092547959' })
// contactRelease(31659423)
