function filterRange(arr, a, b) {
  // yaxshiroq o'qilishi uchun ifoda atrofida qavslar qo'shildi
  return arr.filter((item) => a <= item && item <= b);
}
