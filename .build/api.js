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
module.exports = api;
//# sourceMappingURL=api.js.map
