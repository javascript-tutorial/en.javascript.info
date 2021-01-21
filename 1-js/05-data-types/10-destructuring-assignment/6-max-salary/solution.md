function topSalary(salaries) {
  let [maxName, maxSalary] = [null,null];
  for (let [name, salary] of Object.entries(salaries)) {
    if ( salary > maxSalary) [maxName, maxSalary] = [name, salary];
  } 
  return maxName;
}
