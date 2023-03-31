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

const eventArray = JSON.parse(fs.readFileSync('./data/events.json'));

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

api.get('/students/:id', (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === id) {
      res.send(studentArray[i]).status(200);
    }
  }
})

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

api.get('/events', (req, res) => {
  res.status(200).send(eventArray);
});

api.post('/events', (req, res) => {
  const name = req.query.name;
  const points = req.query.points;
  const id = generateEventId();
  const newEvent = {
    id: id,
    name: name,
    points: points
  }
  eventArray.push(newEvent);
  const newArray = JSON.stringify(eventArray);
  fs.writeFileSync('./data/events.json', newArray);
  res.status(201).send(newEvent);
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

function generateEventId() {
  let counter = 0;
  for (let i = 0; i < eventArray.length; i++) {
    if (studentArray[i].id * 1 === counter) {
      counter++;
      i = -1;
    }
  }
  return counter;
}

module.exports = api;