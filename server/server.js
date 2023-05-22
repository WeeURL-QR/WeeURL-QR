// all router logic in a single file. 
// route to here, middleware/controllers
import { Express } from "express";
const path = require('path');
// will need to require in databse from db.js

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

