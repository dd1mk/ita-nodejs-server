const json = require('../data.json');

const findNewId = () => {
  let newId = 0;
  for (let i = 0; i < json.students.length; i += 1) {
    if (json.students[i].id > newId) {
      newId = json.students[i].id;
    }
  }
  return newId + 1;
};

const findById = id => json.students.find(student => student.id === id);

module.exports = {
  findNewId,
  findById,
};
