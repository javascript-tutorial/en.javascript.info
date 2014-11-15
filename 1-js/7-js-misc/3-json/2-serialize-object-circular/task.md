# Превратите объекты со ссылками в JSON

[importance 3]

Превратите объект `team` из примера ниже в JSON:

```js
var leader = { 
  name: "Василий Иванович"
};

var soldier = {
  name: "Петька"
};

// эти объекты ссылаются друг на друга!
leader.soldier = soldier;
soldier.leader = leader;

var team = [ leader, soldier ];
```

<ol>
<li>Может ли это сделать прямой вызов `JSON.stringify(team)`? Если нет, то почему?</li>
<li>Какой подход вы бы предложили для чтения и восстановления таких объектов?</li>
</ol>