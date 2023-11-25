class Test {
  constructor() {
    this.description = '';

    this.passed = 0;
    this.failed = 0;

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
          self.failed++;
          console.log(
            `-${colors.description} ${self.description} =>${colors.error} ${actual} ✗ \x1b[0m`
          );
          self.description = '';
          return;
        }
        self.passed++;
        console.log(
          `-${colors.description} ${self.description} =>${colors.success} ${actual} ✓ \x1b[0m`
        );
        self.description = '';
      },
    };
  }

  end() {
    console.timeEnd(`Test`);
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m',
    };
    console.log(`${colors.success} ${this.passed} passed \x1b[0m`);
    console.log(`${colors.error} ${this.failed} failed \x1b[0m`);
  }
}

const test = new Test();

module.exports = test;
