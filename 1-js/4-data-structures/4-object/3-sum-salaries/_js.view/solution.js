function sumSalaries(salaries) {

  let sum = 0;
  for (let name in salaries) {
    sum += salaries[name];
  }

  return sum;
}

