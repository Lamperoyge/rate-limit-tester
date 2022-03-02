const rateLimit = require('axios-rate-limit');
const axios = require('axios');

const http = rateLimit(axios.create(), {
  maxRequests: 3,
  perMilliseconds: 1500,
  maxRPS: 3,
});

http.getMaxRPS(); // 2

let successCount = 0;

let errorCount = 0;

for (let i = 0; i < 1000; i++) {
  http
    .get('https://api.opensea.io/api/v1/collection/doodles-official/stats')
    .then((res) => {
      successCount++;
      console.log(res.status, 'count:', successCount);
    })
    .catch((err) => {
      errorCount++;
      console.log(err, 'count error:', errorCount);
    });
}
