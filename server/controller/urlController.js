const db = require('../models/db.js');
const crypto = require('crypto');
const urlController = {};

// Hashing algo using Node.js built in crypto module
  // collision rate with the first 8 characters is 1 in 137
  // can be improved to 1 in 630,000 with a character length of 12
  const hashURL = (url) => {
    const hash = crypto.createHash('sha256').update(url).digest('hex');
    return hash.substring(0, 8);
  }
  // console.log(hashURL("https://www.tutorialspoint.com/sql/sql-insert-query.htm"))
  // 90aef866

// geturl and storeurl
urlController.getUrl = (req, res, next) => {
    // deconstruct longurl from req body? unless req body is just the string then we don't need to deconstruct
    const {longUrl} = req.body;
    const shortUrl = hashURL(longUrl);
    // query database
    const urlQuery = 
    `SELECT
      long_url
    
    FROM
      public."newUrls"

    WHERE
      long_url = $1
    `
    db.query(urlQuery, [longUrl]).then(response => {
        // if res good, then just return the shortened
        if (response.rows.length > 0) {
          // return shortened url
          res.locals.shortUrl = shortUrl
        }
        // if not, add to database with hashed shortened
        else {
          // now we store both long and short in database
          const insertUrls = `
            INSERT INTO public."newUrls"
            VALUES ($1, $2)
          `
          db.query(insertUrls, [longUrl, shortUrl])
          res.locals.shortUrl = shortUrl;
        }
    })
    .then(() => {
      return next();
    })
    .catch(error => {
      console.log(`Error in urlController.getUrl middleware: ${error}`)
      return next();
    })
}

urlController.shortToLong = (req, res, next) => {
    // get request in DB to get long from short
    // grab shortUrl from the route. 
    // "0753e9bc"
    console.log("req params", req.params);
    const {shortUrl} = req.params;
    const shortUrlQuery = 
    `SELECT
      long_url
    
    FROM
      public."newUrls"

    WHERE
      short_url = $1
    `
    db.query(shortUrlQuery, [shortUrl]).then(response => {
      // res.status(200).redirect(whateverurl)
      console.log('this is the long response from querying short', response)
      res.locals.longUrl = response.rows[0]
      return next();
    })
}


module.exports = urlController;