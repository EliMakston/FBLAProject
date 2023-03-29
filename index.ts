import express from "express";
import type {Express, Response, Request} from "express";
const api = require('./api');
const frontend = require('./frontend');
const app : Express = express();
const dirhome = '/home/runner/FBLAProject/src'
const morgan = require('morgan');

const PORT = 8000;

app.listen(() => {
  console.log(`Now listening on port ${PORT}`);
});

//This will serve the initial html page and css
//Not permanent, as I want this all to be handled by frontend
app.get('/', (req, res) => {
  res.sendFile('/index.html', {root: dirhome});
});

app.use(morgan('short'));

//Commented out for replit's sake
app.get('/styles.css', (req, res) => {
  res.sendFile('/styles.css', {root: dirhome});
});

app.use('/api', api);

app.use('/app', frontend);