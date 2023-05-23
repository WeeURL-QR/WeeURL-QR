const db = require('../models/db.js');
const crypto = require('crypto');

const urlController = {};

// geturl and storeurl
urlController.getUrl = (req, res, next) => {
    // query database
    const urlQuery = 
    `SELECT
    
    FROM
    
    `
    db.query(urlQuery).then(res => {
        // if res good, then just return the shortened
        // if not, add to database 
    })




}

urlController.shortToLong = (req, res, next) => {
    // get request in DB to get long from short
}


// Hashing algo using Node.js built in crypto module
  // collision rate with the first 8 characters is 1 in 137
  // can be improved to 1 in 630,000 with a character length of 12
const hashURL = (url) => {
  const hash = crypto.createHash('sha256').update(url).digest('hex');
  return hash.substring(0, 8);
}