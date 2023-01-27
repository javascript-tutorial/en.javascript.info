function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // agar intervaldan tashqarida bo'lsa, olib tashlang
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}
