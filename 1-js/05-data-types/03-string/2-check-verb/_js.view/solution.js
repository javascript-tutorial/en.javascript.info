function checkVerb(str) {
  let lowerStr = str.toLowerCase();

  return lowerStr.includes('move') || lowerStr.includes('swim');
}