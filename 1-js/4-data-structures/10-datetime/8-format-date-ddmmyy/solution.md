Получим компоненты один за другим.
<ol>
<li>День можно получить как `date.getDate()`. При необходимости добавим ведущий ноль:

```js
var dd = date.getDate();
if (dd<10) dd= '0'+dd;
```

</li>
<li>`date.getMonth()` возвратит месяц, начиная с нуля. Увеличим его на 1:

```js
var mm = date.getMonth() + 1;  // месяц 1-12
if (mm<10) mm= '0'+mm;
```

</li>
<li>`date.getFullYear()` вернет год в 4-значном формате. Чтобы сделать его двузначным - воспользуемся оператором взятия остатка `'%'`:

```js
var yy = date.getFullYear() % 100;
if (yy<10) yy= '0'+yy;
```

Заметим, что год, как и другие компоненты, может понадобиться дополнить нулем слева, причем возможно что `yy == 0` (например, 2000 год). При сложении со строкой `0+'0' == '00'`, так что будет все в порядке.
</li>
</ol>

Полный код:

```js
//+ run
function formatDate(date) {

  var dd = date.getDate();
  if ( dd < 10 ) dd = '0' + dd;

  var mm = date.getMonth()+1;
  if ( mm < 10 ) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if ( yy < 10 ) yy = '0' + yy;

  return dd+'.'+mm+'.'+yy;
}

var d = new Date(2014, 0, 30);  // 30 Янв 2014
alert( formatDate(d) );  // '30.01.14'
```

