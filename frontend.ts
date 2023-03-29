import express from "express";
import type {Express, Request, Response} from "express";

const frontend = express.Router();

const dirhome = '/home/runner/FBLAProject/src'

//These all serve the corresponsing html and css files
//Will be updated in the future, but for now, I like this solution
//Only files necessary are loaded

frontend.get('/home', (req, res) => {
  res.sendFile('/index.html', {root: dirhome});
});

frontend.get('/students', (req, res) => {
  res.sendFile('/students.html', {root: dirhome});
});

frontend.get('/events', (req, res) => {
  res.sendFile('/events.html', {root: dirhome});
});

frontend.get('/styles.css', (req, res) => {
  res.sendFile('/styles.css', {root: dirhome});
});

frontend.get('/students.js', (req, res) => {
  res.sendFile('/students.js', {root: dirhome});
});

frontend.get('/', (req, res) => {
  res.sendFile('/index.html', {root: dirhome});
});

frontend.get('*', (req, res) => {
  res.sendFile('/404.html', {root: dirhome});
});

module.exports = frontend;