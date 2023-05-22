// all router logic in a single file. 
// route to here, middleware/controllers
import { Express } from "express";
const path = require('path');
// will need to require in database from db.js
// DON"T think this path is correct, double check later
const db = require(servers/db.js)


const app = express();
const router = express.Router();
const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// router logic is implemented below, using middleware from controllers folder


// catch all route handling for requests to unknown routers
app.use((req,res) => {
  res.status(400).send('The server could not be reached, check that the url you have entered is correct.')
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;