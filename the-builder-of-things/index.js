const Thing = require('./Thing.js');
const test = require('../Test.js');

try {
  const jane = new Thing();
  const john = new Thing('John');

  test.expect(jane.name).toBe('Jane');
  test.expect(john.name).toBe('John');
} catch (error) {
  console.log(error.message);
}
