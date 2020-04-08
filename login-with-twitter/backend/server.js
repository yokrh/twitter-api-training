const express = require('express')
const { default: axios } = require('axios')
const TwitterOAuthHelper = require('./helper').default

// express
const app = express()

/* vars */

// Twitter API domain
const consumerApiKey = ''
const consumerApiSecret = ''
// const accessToken = ''
const accessTokenSecret = ''
const callbackUrl = 'http://localhost:3000'
const requestMethod = 'POST'
const requestUrl = 'https://api.twitter.com/1.1/oauth/request_token'
const authorization = TwitterOAuthHelper.getAuthorization({
  consumerApiKey,
  consumerApiSecret,
  accessTokenSecret,
  callbackUrl,
  requestMethod,
  requestUrl,
})
console.log('authorization', authorization)

/* content */

// test
app.get('/test', async (req, res, next) => {
  console.log("/test")

  // const url = 'https://api.github.com/users/octocat/repos'
  // const r = await  axios.get(url)
  //   .then(data => data.data)
  //   .catch((err) => {
  //     console.error(err)
  //   })

  const r = Date.now()
  console.log(r)

  res.send(`${r}`)
})

// root
app.get('/', async (req, res, next) => {
  console.log("/root")

  const url = requestUrl
  const body = {}
  const headers = {
    Host: 'api.twitter.com',
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: authorization
  }
  const r = await axios.post(url, body, headers)
    .then(data => data.data)
    .catch((err) => {
      console.log(err)
    })

  res.send(r)
})


// run server
app.listen(3000, () => {
  console.log('Express listening on port 3000!')
})
