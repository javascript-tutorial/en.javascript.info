<?php 
header('Cache-Control: no-cache');
$data = @json_encode($_POST['data'] ?: 'Server date: '.date('H:i:s'));
?>
<script>
parent.CallbackRegistry[window.name](<?=$data?>);
</script>
