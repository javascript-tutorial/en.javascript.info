<?php 
header('Cache-Control: no-cache');
$data = json_encode($_POST['data'] ?: 'Server date: '.date('H:i:s'));
?>
<script>
parent.postMessage(JSON.stringify({
	name: window.name,
	body: <?=$data?>
}), "http://learn.javascript.ru"); // разрешить читать ответ только с этого хоста
</script>
