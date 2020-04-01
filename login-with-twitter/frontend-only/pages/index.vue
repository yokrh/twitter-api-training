<template>
  <div>
    <div @click="loginWithTwitter">
      Login
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // Twitter API key
      consumerKey: 'ywxsGR6DefabHX5PmAHAz94DJ',
      // Callback url with URL encoding
      callback: 'http%3A%2F%2F127.0.0.1%3A3000',
    }
  },
  methods: {
    loginWithTwitter() {
      console.log('loginWithTwitter')

      /**
       * Twitter doesn't allow CORES
       * so that pre-flight OPTION request fails...
       * 
       * Need to use server side or SAAS.
       */

      // const domain = 'https://api.twitter.com/1.1'
      // const url = `${domain}/oauth/request_token`
      // const body = {}
      // const headers = {
      //   Host: 'api.twitter.com',
      //   Origin: 'api.twitter.com',
      //   Accept: '*/*',
      //   'Access-Control-Allow-Origin': 'api.twitter.com',
      //   Authorization: `
      //     OAuth oauth_callback="${this.callback}",
      //           oauth_consumer_key="${this.consumerKey}",
      //           oauth_version="1.0"
      //     `
      //   ,
      // }
      // this.$axios.post(url, body, headers)
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    },
  },
}
</script>

<style>
</style>
