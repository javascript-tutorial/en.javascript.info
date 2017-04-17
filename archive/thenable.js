function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error: " + src));

    document.head.append(script);
  });
}
loadScript("/article/promise-chaining/one.js")
  .then(script => {
    return {
      then(resolve, reject) {
        setTimeout(() => resolve(script), 1000);
      }
    };
  })
  .then(function(script) {
    alert(one);
  });

