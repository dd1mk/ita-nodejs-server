const express = require('express');
const bodyParser = require('body-parser');
const json = require('../data.json');
const { findById, findNewId } = require('./db');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  res.render('layout', { ...json });
});

router.get('/edit/:id', (req, res) => {
  res.render('edit', { student: findById(parseInt(req.params.id, 10)) });
});

router.post('/delete/', (req, res) => {
  json.students = json.students.filter(student => student.id !== parseInt(req.body.id, 10));
  res.redirect(`${req.baseUrl}/`);
});

router.post('/add', (req, res) => {
  const newStudent = { ...req.body, id: findNewId() };
  json.students = [...json.students, newStudent];
  res.redirect(`${req.baseUrl}/`);
});

router.post('/edit', (req, res) => {
  const student = findById(parseInt(req.body.id, 10));
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  res.redirect(`${req.baseUrl}/`);
});

module.exports = router;
