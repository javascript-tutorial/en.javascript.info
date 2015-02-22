<?php 
header('Cache-Control: no-cache');
$data = json_encode($_POST['data'] ?: 'Server date: '.date('H:i:s'));

// $blankUrl can be any empty document
$blankUrl = 'http://learn.javascript.ru'.dirname($_SERVER['REQUEST_URI']).'/blank.html';
 ?>
<script>
window.name = "<?=str_replace('"','\\"',$data)?>"; // положить JSON внутрь строки, иначе JSON.parse(window.name) не сработает

// сам IFRAME должен поменять свой адрес, иначе в IE name не сохранится
window.location.replace('<?=$blankUrl?>');
</script>
