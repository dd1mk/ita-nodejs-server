const express = require('express');
const bodyParser = require('body-parser');
const json = require('../data.json');
const { findById, findNewId } = require('./db');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.route('/students')

  .get((req, res) => {
    res.send(JSON.stringify(json));
  })

  .post((req, res) => {
    const { firstName, lastName } = req.body;
    const newStudent = { firstName, lastName, id: findNewId() };
    json.students = [...json.students, newStudent];
    res.send(JSON.stringify({ message: 'Succesfully added student', newStudent }));
  })

  .delete((req, res) => {
    const deletedStudent = findById(parseInt(req.body.id, 10));
    if (deletedStudent) {
      json.students = json.students.filter(student => student.id !== parseInt(req.body.id, 10));
      res.send(JSON.stringify({ message: 'Student succesfully deleted', deletedStudent }));
    } else {
      res.send(JSON.stringify({ error: 'No student with such id found!' }));
    }
  })

  .put((req, res) => {
    const student = findById(parseInt(req.body.id, 10));
    if (student) {
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      res.send(JSON.stringify({ message: 'Student succesfully edited', student }));
    } else {
      res.send(JSON.stringify({ error: 'No student with such id found!' }));
    }
  });

module.exports = router;
