function unique(arr) {
	const uniqueArr = [];
  
	arr.forEach(item => uniqueArr.includes(item) ? null : uniqueArr.push(item));
	return uniqueArr;

}
