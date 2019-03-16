# Application-only usage with bearer token in shell

## Note

seems cannnot *search* tweets that
- posted by the locked account
- posted by the currently unlocked account which was locked when posted the tweets
(can *get from timeline* if the account is unlocked now.)


## How to

### Get bearer token
https://developer.twitter.com/en/docs/basics/authentication/oauth-2-0/application-only
https://developer.twitter.com/en/apps/9309896
https://developer.twitter.com/en/account/environments
```
curl -u 'xxxxxxxxKEYxxxxxxxx:xxxxxxxxxxxxxxxxxxxSECRETxxxxxxxxxxxxxxxxxxx' \
  --data 'grant_type=client_credentials' \
  'https://api.twitter.com/oauth2/token'
```

### Get a Tweet
https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-show-id

### Get timeline of the specified user
https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html

### Search tweets in 30days
https://developer.twitter.com/en/docs/tweets/search/quick-start/premium-30-day
```
curl --request POST \
  --url https://api.twitter.com/1.1/tweets/search/30day/searchTweetEnvName.json \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
  --data '{
            "query":"from:TwitterDev",
            "maxResults": "100",
            "fromDate":"201903010000",
            "toDate":"201903160000"
          }'
```

### Search tweets in all days
https://developer.twitter.com/en/docs/tweets/search/quick-start/premium-full-archive
```
curl --request POST \
  --url https://api.twitter.com/1.1/tweets/search/fullarchive/searchTweetEnvName.json \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
  --data '{
            "query":"from:TwitterDev lang:en",
            "maxResults": "100",
            "fromDate":"201811010000",
            "toDate":"201811062359"
          }'
```
