function calculate(sum) {
  const sumArray = sum.split('');
  const numbers = [];
  const operators = [];
  let currentNumber = '';

  sumArray.forEach((char) => {
    if (char === '.') {
      currentNumber += char;
      return;
    }
    if (!isNaN(char)) {
      currentNumber += char;
      return;
    }
    operators.push(char);
    numbers.push(Number(currentNumber));
    currentNumber = '';
  });
  numbers.push(Number(currentNumber));
  console.log('numbers', numbers);
  console.log('operators', operators);

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const nextNumber = numbers[i + 1];
    switch (operator) {
      case '+':
        result += nextNumber;
        break;
      case '-':
        result -= nextNumber;
        break;
      case '*':
        result *= nextNumber;
        break;
      case '$':
        result /= nextNumber;
        break;
      default:
        break;
    }
  }
  return result;
}

const testList = [
  {
    test: '1+1',
    expected: 2,
  },
  {
    test: '10$2',
    expected: 5,
  },
  {
    test: '1.5*3',
    expected: 4.5,
  },
  {
    test: '5+5+5+5',
    expected: 20,
  },
  {
    test: '1000$2.5$5+5-5+6$6',
    expected: 81,
  },
  {
    test: '10-9p',
    expected: '400: Bad Request',
  },
];

testList.forEach(({ test, expected }) => {
  const result = calculate(test);
  console.log('result', result);
  console.log('expected', expected);
  console.log('result === expected', result === expected);
});
