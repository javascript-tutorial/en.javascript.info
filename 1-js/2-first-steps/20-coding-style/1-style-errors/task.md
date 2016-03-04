importance: 4

---

# Ошибки в стиле

Какие недостатки вы видите в стиле этого примера?

```js no-beautify
function pow(x,n)
{
  var result=1;
  for(var i=0;i<n;i++) {result*=x;}
  return result;
}

x=prompt("x?",'')
n=prompt("n?",'')
if (n<=0)
{
  alert('Степень '+n+'не поддерживается, введите целую степень, большую 0');
}
else
{
  alert(pow(x,n))
}
```

