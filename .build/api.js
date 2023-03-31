"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
const fs = require("fs");
const api = import_express.default.Router();
api.use((req, res, next) => {
  next();
});
api.get("/", (req, res) => {
  res.send("GET: API root");
});
const studentArray = JSON.parse(fs.readFileSync("./data/students.json"));
const eventArray = JSON.parse(fs.readFileSync("./data/events.json"));
api.get("/students", (req, res) => {
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
api.get("/students/:id", (req, res) => {
  const id = req.params.id;
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === id) {
      res.send(studentArray[i]).status(200);
    }
  }
});
api.post("/students", (req, res) => {
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const gradeLevel = req.query.gradeLevel;
  const id = generateStudentId();
  const newStudent = {
    id,
    firstName,
    lastName,
    gradeLevel,
    points: 0,
    events: []
  };
  studentArray.push(newStudent);
  const newArray = JSON.stringify(studentArray);
  fs.writeFileSync("./data/students.json", newArray);
  res.status(201).send(newStudent);
});
api.post("/students/:studentId/events/:eventId", (req, res) => {
  const studentId = req.params.studentId;
  const eventId = req.params.eventId;
  let studentIndex = 0;
  let eventIndex = 0;
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === studentId) {
      studentIndex = i;
    }
  }
  for (let i = 0; i < eventArray.length; i++) {
    if (eventArray[i].id === eventId) {
      eventIndex = i;
    }
  }
  studentArray[studentIndex].events.push(eventId);
  studentArray[studentIndex].points = Number(studentArray[studentIndex].points) + Number(eventArray[eventIndex].points);
  const newArray = JSON.stringify(studentArray);
  fs.writeFileSync("./data/students.json", newArray);
  res.status(201).send(studentArray[studentIndex].events);
});
api.get("/events", (req, res) => {
  res.status(200).send(eventArray);
});
api.post("/events", (req, res) => {
  const name = req.query.name;
  const points = req.query.points;
  const id = generateEventId();
  const newEvent = {
    id,
    name,
    points
  };
  eventArray.push(newEvent);
  const newArray = JSON.stringify(eventArray);
  fs.writeFileSync("./data/events.json", newArray);
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
//# sourceMappingURL=api.js.map
