const crypto = require("crypto")

/**
 * Twitter OAuth helper class.
 * ref: https://developer.twitter.com/en/docs/basics/authentication/guides/log-in-with-twitter
 *
 * ### Authorization header structure
 * oauth_consumer_key: "",
 * oauth_signature_method: "HMAC-SHA1",
 * oauth_signature: "",
 * oauth_nonce: ""
 * oauth_timestamp: ""
 * oauth_version: "1.0"
 */
exports.default = class TwitterOAuthHelper {
  static getAuthorization({
    consumerApiKey = '',
    consumerApiSecret = '',
    // accessToken = '',
    accessTokenSecret = '',
    callbackUrl = '',
    requestMethod = 'POST',
    requestUrl = 'https://api.twitter.com/1.1/oauth/request_token',
  }) {
    const signatureKey = TwitterOAuthHelper.getSignatureKey(consumerApiSecret, accessTokenSecret)
    const signatureData = TwitterOAuthHelper.getSignatureData(
      requestMethod,
      requestUrl,
      TwitterOAuthHelper.getSignatureDataRequestParam(callbackUrl, consumerApiKey))
    const signature = TwitterOAuthHelper.getSignature(signatureKey, signatureData)

    const oauthParams = TwitterOAuthHelper.getOauthParams(callbackUrl, consumerApiKey, signature)
    const oauthParamsStr = Object.keys(oauthParams)
      .map(k => `${k}=${encodeURIComponent(oauthParams[k])}`)
      .join(',')
    const authorization = `OAuth ${oauthParamsStr}`

    return authorization
  }

  static getSignatureKey(consumerSecret, tokenSecret) {
    return `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`
  }

  static getSignatureData(requestMethod, requestUrl, requestParam) {
    return `${encodeURIComponent(requestMethod)}&${encodeURIComponent(requestUrl)}&${encodeURIComponent(requestParam)}`
  }

  static getSignature(key, data) {
    return crypto.createHmac('sha1', key).update(data).digest('base64')
  }

  static getSignatureDataRequestParam(callbackUrl, consumerApiKey) {
    const oauthParamsExceptSignature = TwitterOAuthHelper.getOauthParamsExceptSignature(callbackUrl, consumerApiKey)
    return Object.keys(oauthParamsExceptSignature)
      .sort()
      .map(k => `${k}=${oauthParamsExceptSignature[k]}`)
      .join('&')
  }

  static getOauthParamsExceptSignature(callbackUrl, consumerApiKey) {
    return {
      oauth_callback: callbackUrl,
      oauth_consumer_key: consumerApiKey,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_nonce: Date.now() + Math.round(Math.random() * 1000000),
      oauth_timestamp: Math.round(Date.now() / 1000),
      oauth_version: '1.0',
    }
  }

  static getOauthParams(callbackUrl, consumerApiKey, signature) {
    const res = TwitterOAuthHelper.getOauthParamsExceptSignature(callbackUrl, consumerApiKey)
    res.oauth_signature = signature
    return res
  }
}