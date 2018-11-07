require('dotenv').config()
const fetch = require('node-fetch')
const ROOT_URL = 'https://localbitcoins.com/api/'

const KEY = process.env.APIAUTH-KEY
const SIGNATURE = process.env.APIAUTH-SIGNATURE

const getData = async path => {
  const url = ROOT_URL + path
  const res = await fetch(url)

  return res.json()
}

const getCurrencies = async () => {
  const path = 'currencies/'
  const response = await getData(path)
  console.log(response)
}
getCurrencies()
