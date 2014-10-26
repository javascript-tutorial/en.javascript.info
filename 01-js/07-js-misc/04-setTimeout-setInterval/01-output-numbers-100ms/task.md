# Вывод чисел каждые 100мс

[importance 5]

Напишите функцию `printNumbersInterval()`, которая последовательно выводит в консоль числа от 1 до 20, с интервалом между числами 100мс. То есть, весь вывод должен занимать 2000мс, в течение которых каждые 100мс в консоли появляется очередное число.

Нажмите на кнопку, открыв консоль, для демонстрации:
<script> 
function printNumbersInterval() {
  var i = 1;
  var timerId = setInterval(function() {
    console.log(i);
    if (i == 20) clearInterval(timerId);
    i++;
  }, 100);
}
</script>
<button onclick="printNumbersInterval()">printNumbersInterval()</button>
</script>

P.S. Функция должна использовать `setInterval`.