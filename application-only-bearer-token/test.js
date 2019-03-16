/**
 * Get tweets by curl and out put to console.log
 */

const fs = require('fs');
const childProcess = require('child_process');

const exec = childProcess.exec;

// API: /statuses/user_timeline
const COMMAND1 = `
curl --request GET \
  --url 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=5Hanayome&count=10' \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
> out.json
`;
// API: /tweets/search
const COMMAND2 = `
curl --request POST \
  --url https://api.twitter.com/1.1/tweets/search/30day/searchTweetEnvName.json \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
  --data '{
    "query":"from:5Hanayome",
    "maxResults": "10",
    "fromDate":"201903010000",
    "toDate":"201903160000"
  }' \
> out.json
`;
// API: /statuses/show
const COMMAND3 = `
curl --request GET \
  --url https://api.twitter.com/1.1/statuses/show.json?id=936429725400084480 \
  --header 'authorization: Bearer AAAAAAAAAAAAAAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
  --header 'content-type: application/json' \
> out.json
`;

const COMMAND = COMMAND3;
exec(COMMAND, function(error, stdout, stderr) {
  if (error !== null) {
    console.log('update exec error : ' + error);
  }

  const txt = fs.readFileSync("out.json", {encoding: "utf-8"});
  let json = JSON.parse(txt);
  if (COMMAND === COMMAND2) json = json.results;
  //console.log('DEBUG', json);

  if (COMMAND === COMMAND1 || COMMAND == COMMAND2) {
    const res = json.map(e => e.text);
    console.log(res.length);
    console.log(res);
  }
  else if (COMMAND === COMMAND3){
    const res = json.text;
    console.log(res);
  }
});
