function topSalary(salaries) {

  let maxSalary = 0;
  let maxName = null;

  for(const [name, salary] of Object.entries(salaries)) {
    if (max < salary) {
      maxSalary = salary;
      maxName = name;
    }
  }

  return maxName;
}