const test = require('../Test.js');

class Thing {
  constructor(name) {
    this.name = name;
  }
}

const jane = new Thing('Jane');
const john = new Thing('John');

test.expect(jane.name).toBe('Jane');
test.expect(john.name).toBe('John');
