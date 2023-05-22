// require in Pool from pg
const Pool = require('pg')
// get PG uri from RDS
const PG_URI = 'the uri string'
// create a new pool using the connection string above
const pool = new Pool({
    connectionString: PG_URI
  });

// We export an object that contains a property called query.
// Query is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
    query: (text, params, callback) => {
      console.log('executed query to DB', text);
    //   this pool.query is specifically to our database
      return pool.query(text, params, callback);
    }
  };

