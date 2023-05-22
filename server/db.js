// set up RDS db


// require in Pool from pg
const {Pool} = require('pg')

// get PG uri from RDS


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
    query: (text, params, callback) => {
      console.log('executed query to DB', text);
      return pool.query(text, params, callback);
    }
  };

