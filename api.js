require('dotenv').config()
const crypto = require('crypto');
const querystring = require('querystring');
const fetch = require('node-fetch')
const ROOT_URL = 'https://localbitcoins.com/api/'

const KEY = process.env.APIAUTH_KEY
const SECRET = process.env.APIAUTH_SECRET

const DEFAULT_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Apiauth-Key': KEY
}

const getMessageSignature = (path, params, nonce) => {
  const postParameters = querystring.stringify(params)
  const _path = '/api/' + path
  const message = nonce + KEY + _path + postParameters

  return crypto.createHmac("sha256", SECRET).update(message).digest('hex').toUpperCase()
}

const getHeaders = (path, params = {}) => {
  const nonce = new Date() * 1000
  const signature = getMessageSignature(path, params, nonce)

  return {...DEFAULT_HEADERS, ...{ 'Apiauth-Nonce': nonce, 'Apiauth-Signature': signature }}
}

const api = {
  get: async path => {
    const headers = getHeaders(path)
    const res = await fetch(ROOT_URL + path, { method: 'GET', headers })

    return res.json()
  },

  post: async (path, payload) => {
    const headers = getHeaders(path, payload)
    const res = fetch(ROOT_URL + path, { method: 'POST', body: JSON.stringify(payload), headers })

    return res.json()
  }
}

module.exports = api
