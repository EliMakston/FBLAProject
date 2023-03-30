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
const api = require("./api");
const frontend = require("./frontend");
const app = (0, import_express.default)();
const dirhome = "/home/runner/FBLAProject/src";
const morgan = require("morgan");
const PORT = 8e3;
app.listen(() => {
  console.log(`Now listening on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: dirhome });
});
app.use(morgan("short"));
app.get("/styles.css", (req, res) => {
  res.sendFile("/styles.css", { root: dirhome });
});
app.use("/api", api);
app.use("/app", frontend);
//# sourceMappingURL=index.js.map
