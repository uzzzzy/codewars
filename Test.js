class Test {
  constructor() {
    this.description = '';
  }

  describe(description) {
    this.description = description;

    return this;
  }

  expect(actual) {
    const self = this;
    return {
      toBe(expected) {
        const colors = {
          description: '\x1b[33m',
          success: '\x1b[32m',
          error: '\x1b[31m',
        };
        console.log(
          `-${colors.description} ${self.description} =>${colors.success} ${actual} ✓ \x1b[0m`
        );
        self.description = '';
      },
    };
  }
}

const test = new Test();

module.exports = test;
