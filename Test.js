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

module.exports = test;
