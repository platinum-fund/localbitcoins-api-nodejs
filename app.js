const fetch = require('node-fetch')
const ROOT_URL = 'https://localbitcoins.com/api/'

const getData = async () => {
  const url = ROOT_URL + 'currencies/'

  const res = await fetch(url)
  return res.json()
}

const start = async () => {
  const response = await getData()
  console.log(response)
}
start()