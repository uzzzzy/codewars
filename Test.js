class Test {
  constructor() {
    this.description = '';

    console.time('Test');
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
        if (actual !== expected) {
          console.log(
            `-${colors.description} ${self.description} =>${colors.error} ${actual} ✗ \x1b[0m`
          );
          self.description = '';
          return;
        }
        console.log(
          `-${colors.description} ${self.description} =>${colors.success} ${actual} ✓ \x1b[0m`
        );
        self.description = '';
      },
    };
  }

  end() {
    console.timeEnd('Test');
  }
}

const test = new Test();

module.exports = test;
