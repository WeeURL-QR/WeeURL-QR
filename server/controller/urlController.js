const db = require('../models/db.js');
const crypto = require('crypto');
const urlController = {};

// Hashing algo using Node.js built in crypto module
// collision rate with the first 8 characters is 1 in 137
// can be improved to 1 in 630,000 with a character length of 12
const hashURL = (url) => {
  const hash = crypto.createHash('sha256').update(url).digest('hex');
  return hash.substring(0, 8);
};

// geturl and storeurl
urlController.getUrl = (req, res, next) => {
  // deconstruct longurl from req body? unless req body is just the string then we don't need to deconstruct
  const { longUrl } = req.body;
  // console.log('this is the req.body in url controller getUrl', req.body);
  console.log('this is longUrl', longUrl);
  const shortUrl = hashURL(longUrl);
  console.log('this is short url', shortUrl);
  // query database
  const urlQuery = `SELECT
      long_url
    
    FROM
      public."newUrls"

    WHERE
      long_url = $1
    `;
  db.query(urlQuery, [longUrl])
    .then((response) => {
      // if res good, then just return the shortened
      if (response.rows.length > 0) {
        // return shortened url
        // console.log('already exists, returning shortened url');
        res.locals.shortUrl = shortUrl;
      }
      // if not, add to database with hashed shortened
      else {
        // now we store both long and short in database
        // console.log('adding to database');
        const insertUrls = `
        INSERT INTO public."newUrls"
        VALUES ($1, $2)
      `;
        db.query(insertUrls, [longUrl, shortUrl]);
        res.locals.shortUrl = shortUrl;
      }
    })
    .then(() => {
      return next();
    })
    .catch((error) => {
      console.log(`Error in urlController.getUrl middleware: ${error}`);
      return next(error);
    });
};

urlController.shortToLong = (req, res, next) => {
  console.log('req params', req.params);
  const { shortUrl } = req.params;
  const shortUrlQuery = `
    SELECT
      long_url
    
    FROM
      public."newUrls"

    WHERE
      short_url = $1
    `;
  db.query(shortUrlQuery, [shortUrl])
    .then((response) => {
      res.locals.longUrl = response.rows[0]['long_url'];
      console.log(res.locals.longUrl);
      return next();
    })
    .catch((error) => {
      console.log(
        `Error in urlController.shortToLong middleware: ${error}`
      );
      return next(error);
    });
};

module.exports = urlController;
