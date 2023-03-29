import express from "express";
const fs = require('fs');
import type {Express, Request, Response} from "express";

const api = express.Router();

api.use((req, res, next) => {
  next();
});

api.get('/', (req, res) => {
  res.send('GET: API root');
});

const studentArray = JSON.parse(fs.readFileSync('./data/students.json'));

api.get('/students', (req, res) => {
  const gradeLevel = req.query.gradeLevel;
  if (!gradeLevel) {
    res.send(studentArray);
  }
  const temp = [];
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].gradeLevel === gradeLevel) {
      temp.push(studentArray[i]);
    }
  }
  res.send(temp);
});

module.exports = api;