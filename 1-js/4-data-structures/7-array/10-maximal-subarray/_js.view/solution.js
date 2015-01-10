function getMaxSubSum(arr) {
  var maxSum = 0, partialSum = 0;
  for (var i=0; i<arr.length; i++) {
    partialSum += arr[i];
    maxSum = Math.max(maxSum, partialSum);
    if (partialSum < 0) partialSum = 0;
  }
  return maxSum;
}

