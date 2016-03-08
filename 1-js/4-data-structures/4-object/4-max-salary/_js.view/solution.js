function topSalary(salaries) {

  let max = 0;
  let maxName = null;

  for (let name in salaries) {
    if (max < salaries[name]) {
      max = salaries[name];
      maxName = name;
    }
  }

  return maxName;
}


