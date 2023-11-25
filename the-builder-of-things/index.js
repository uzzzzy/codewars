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

  john
    .has(1)
    .head.having(2)
    .eyes.each((eye) => being_the.color.green.and_the.shape.round);

  test
    .describe('John has green eyes')
    .expect(john.head.eyes[0].color)
    .toBe('green');
  test
    .describe('John has round eyes')
    .expect(john.head.eyes[0].shape)
    .toBe('round');
  test.describe('Jane is a man').expect(jane.is_a_man).toBe(false);
  test.describe('Jane is a woman').expect(jane.is_a_woman).toBe(true);
  test.describe('jane name is Jane').expect(jane.name).toBe('Jane');

  test.describe('John is a person').expect(john.is_a_person).toBe(false);
  test.describe('john name is John').expect(john.name).toBe('John');
  test.describe('John is a man').expect(john.is_a_man);

  jane.has(2).hands.each((hand) => having(5).fingers);

  test.describe('Jane has 2 hands').expect(jane.hands.length).toBe(2);
  test
    .describe('Jane has 5 fingers on each hand')
    .expect(jane.hands[0].fingers.length)
    .toBe(5);
  test
    .describe('Jane has 5 fingers on each hand')
    .expect(jane.hands[1].fingers.length)
    .toBe(5);

  jane.is_the.parent_of.john;
  test
    .describe('Jane is the parent of John')
    .expect(jane.parent_of)
    .toBe('john');

  test.describe('Jane has 2 hands').expect(jane.hands.length).toBe(2);

  test.end();
} catch (error) {
  console.log(error.message);
}
