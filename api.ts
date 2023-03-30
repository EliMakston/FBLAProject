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

api.post('/students', (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const gradeLevel = req.query.gradeLevel;
  const id = generateStudentId();
  const newStudent = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    gradeLevel: gradeLevel,
    points: 0,
    events: []
  }
  studentArray.push(newStudent);
  const newArray = JSON.stringify(studentArray);
  fs.writeFileSync('./data/students.json', newArray);
  res.status(201).send(newStudent);
});

function generateStudentId() {
  let counter = 0;
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id * 1 === counter) {
      counter++;
      i = -1;
    }
  }
  return counter;
}

module.exports = api;