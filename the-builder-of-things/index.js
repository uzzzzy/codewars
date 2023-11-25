const Thing = require('./Thing.js');
const test = require('../Test.js');

// clean up the console
console.clear();
try {
  const jane = new Thing('Jane');
  const john = new Thing('John');

  jane.is_a.person;
  jane.is_a.man;
  jane.is_a.woman;
  john.is_a_man;

  test.describe('Jane is a person').expect(jane.is_a_person).toBe(true);
  test.describe('Jane is a man').expect(jane.is_a_man).toBe(false);
  test.describe('Jane is a woman').expect(jane.is_a_woman).toBe(true);
  test.describe('jane name is Jane').expect(jane.name).toBe('Jane');

  test.describe('John is a person').expect(john.is_a_person).toBe(false);
  test.describe('john name is John').expect(john.name).toBe('John');
  test.describe('John is a man').expect(john.is_a_man);

  test.end();
} catch (error) {
  console.log(error.message);
}
