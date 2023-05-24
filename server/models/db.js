const { Pool, Client } = require('pg');
// require('dotenv').config();
// get PG uri from RDS
// const PG_URI = process.env.PG_URI;
const PG_URI =
    'postgresql://urladmin:QjJ9ChR2DNfmvXNkWOHe@urldb.cmd5f7fuanao.us-west-2.rds.amazonaws.com:5432/postgres';

// create a new pool using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query.
// Query is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query to DB');
    // console.log('executed query to DB, this is the params', params);
    // console.log('executed query to DB, this is the callback', callback);
    //   this pool.query is specifically to our database
    return pool.query(text, params, callback);
  },
};
