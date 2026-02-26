let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};
function topSalary(salaries = {}) {
    const nth = Object.keys(salaries).length;   // getting object property names in array and then getting array length. 
    if (nth == 0) return null;  // if array is empty return null

    const salaryData = [];  // creating new array to store salaries only.

    for (let [employ, salary] of Object.entries(salaries)) salaryData.push(salary); // storing salary in salaryData array.

    return `Hightes paying salary is => ${Math.max(...salaryData)}`;    // calculating max salary number with the help of Math.max()
}
console.log((topSalary(salaries)))
