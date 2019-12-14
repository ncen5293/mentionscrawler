# Mentions Crawler

Mentions Crawler is a web application that allows employees/owners of companies to track content written about their company on different platforms like Reddit, Twitter, New York Times, etc.

## Contributors

[Ahana Ghosh](https://github.com/ahana15), [Derek Jou](https://github.com/derekjou), [Nicky Cen](https://github.com/ncen5293)

## Tech/Framework

Our Stack:

- React.js/Material UI
- Express/Node.js
- MongoDB
- Redis
- Socket.io
- JWT
- Twilio SendGrid
- Bcrypt

# Installations

1. Add API Key Dependencies to the project (see **Adding API Key Dependencies** below for instructions)
2. cd to the client directory (front-end)
3. Install dependencies via `npm install`
4. start the app via `npm start`
5. Head to http://localhost:3000 on the browser
6. cd to the server directory (back-end)
7. Install dependencies via `npm install`
8. run server via `npm start`
9. server will run on http://localhost:4000

### Adding API Key Dependencies

This program requires the following API keys.
These can be obtained here (follow the instructions on the website links):

- [Twitter API](https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens)
- Reddit API
  - [Snoowrap](https://not-an-aardvark.github.io/reddit-oauth-helper/)
  - [Reddit](https://www.reddit.com/prefs/apps/)
- [SENDGRID API](https://sendgrid.com/)
- [NEW YORK TIMES API](https://developer.nytimes.com/apis)

1. Add a `.env` file under `server/` with a key-value pair of
   <br>
   `MARKETCHECK_API_KEY={{INSERT MARKETCHECK API KEY HERE}}`
   `MONGO_URL={{INSERT MONGO URL}}`
   `SECRET={{INSERT ANY STRING OF ANY LENGTH}}`
   `SENDGRID_API_KEY={{INSERT SENDGRID API KEY}}`
   `REDDIT_CLIENT_ID={{INSERT REDDIT CLIENT ID}}`
   `REDDIT_CLIENT_SECRET={{INSERT REDDIT CLIENT SECRET}}`
   `REDDIT_REFRESH_TOKEN={{INSERT REFRESH TOKEN}}`
   `TWITTER_API_KEY={{INSERT TWITTER API KEY}}`
   `TWITTER_API_SECRET={{INSERT TWITER API SECRET}}`
   `TWITTER_TOKEN={{INSERT TWITTER TOKEN}}`
   `TWITTER_TOKEN_SECRET={{INSERT TWITTER TOKEN SECRET}}`
   `TWITTER_BEARER_TOKEN={{INSERTT TWITTER BEARER TOKEN}}`
   `REDIS_AUTH={{BY DEFAULT THIS IS redis://127.0.0.1:6379}}`
   `NYT_API_KEY={{INSERT NEW YORK TIMES API KEY}}`
