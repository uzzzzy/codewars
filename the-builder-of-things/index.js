const Thing = require('./Thing.js');
const test = require('../Test.js');

const jane = new Thing('Jane');
const john = new Thing('John');

test.expect(jane.name).toBe('Jane');
test.expect(john.name).toBe('John');
