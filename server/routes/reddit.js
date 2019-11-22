const express = require("express");
const router = express.Router();
const snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'mentionscrawler',
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

//example to check if reddit mentions work
// r.search({query: 'microsoft', sort: 'top'})
//   .then(res => {
//     console.log(res[0]);
//     res.forEach((submission, i) => {
//       console.log(submission.title);
//       console.log(submission.subreddit_name_prefixed)
//       console.log(submission.permalink);
//       console.log(submission.thumbnail);
//       console.log(submission.selftext);
//     });
//   });

router.get("/search/new/:company", (req, res, next) => {
  r.search({query: req.params.company, sort: 'new'})
    .then(res => {
      res.forEach((submission, i) => {
        console.log(submission.title);
        console.log(submission.subreddit_name_prefixed)
        console.log(submission.permalink);
        console.log(submission.thumbnail);
        console.log(submission.selftext);
      });
    });
});

module.exports = router;
