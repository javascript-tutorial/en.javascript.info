// multiply all object numbers with 2
let menu = {
  width: 200,
  height: 300,
  title: "My menu",
};

function multiplyNumeric(obj) {
  for (key in obj) {
    if (typeof obj[key] === "number") menu[key] = menu[key] * 2;
  }

  console.log(menu)
}
multiplyNumeric(menu);
