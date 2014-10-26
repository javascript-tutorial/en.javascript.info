<?php

$result = `fgrep -lr '[head]' .`;
foreach(explode("\n", $result) as $file) {
  if (substr($file, -3) != '.md') continue;
  // echo $file, "\n";
  $file = preg_replace('~\/\d+-~ims', '/', $file);
  $file = "http://new.javascript.ru/" .  basename(dirname($file));
  echo $file, "\n";
}
