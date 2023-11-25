class Test {
  expect(actual) {
    return {
      toBe(expected) {
        const colors = {
          success: '\x1b[32m',
          error: '\x1b[31m',
        };
        if (actual !== expected) {
          console.log(`${colors.error}✗ ${actual} does not equal ${expected}`);
        } else {
          console.log(`${colors.success}✓ ${actual} equals ${expected}`);
        }
      },
    };
  }
}

const test = new Test();

class Thing {
  constructor(name) {
    this.name = name;
  }
}

const jane = new Thing('Jane');
const john = new Thing('John');

test.expect(jane.name).toBe('Jane');
test.expect(john.name).toBe('John');
