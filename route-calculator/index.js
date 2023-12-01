function calculate(sum) {
  console.log('calculate', sum);
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
    expected: 1,
  },
];

testList.forEach(({ test, expected }) => {
  const result = calculate(test);
  console.log('result', result);
  console.log('expected', expected);
  console.log('result === expected', result === expected);
});
