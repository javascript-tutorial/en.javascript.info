function camelize(str) {
  return str
    .split("-") // 'my-long-word'ni massivga ajratadi ['my', 'long', 'word']
    .map(
      // birinchisidan tashqari barcha massiv elementlarining birinchi harflarini bosh harflar bilan yozadi
      // ['my', 'long', 'word'] ni ['my', 'Long', 'Word']ga aylantiradi.
      (word, index) =>
        index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(""); // ['my', 'Long', 'Word'] 'myLongWord'ga qo'shiladi
}
