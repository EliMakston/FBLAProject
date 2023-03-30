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
const frontend = import_express.default.Router();
const dirhome = "/home/runner/FBLAProject/src";
frontend.get("/home", (req, res) => {
  res.sendFile("/index.html", { root: dirhome });
});
frontend.get("/students", (req, res) => {
  res.sendFile("/students.html", { root: dirhome });
});
frontend.get("/events", (req, res) => {
  res.sendFile("/events.html", { root: dirhome });
});
frontend.get("/options", (req, res) => {
  res.sendFile("/options.html", { root: dirhome });
});
frontend.get("/students/:id", (req, res) => {
  res.sendFile("/profile.html", { root: dirhome });
});
frontend.get("/styles.css", (req, res) => {
  res.sendFile("/styles.css", { root: dirhome });
});
frontend.get("/students.js", (req, res) => {
  res.sendFile("/students.js", { root: dirhome });
});
frontend.get("/options.js", (req, res) => {
  res.sendFile("/options.js", { root: dirhome });
});
frontend.get("/profile.js", (req, res) => {
  res.sendFile("/profile.js", { root: dirhome });
});
frontend.get("/", (req, res) => {
  res.sendFile("/index.html", { root: dirhome });
});
frontend.get("*", (req, res) => {
  res.sendFile("/404.html", { root: dirhome });
});
module.exports = frontend;
//# sourceMappingURL=frontend.js.map
