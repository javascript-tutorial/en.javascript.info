<?php
$files = trim(`find . -name *.png`);
$files = explode("\n", $files);

$root = getcwd();

echo $root;
foreach($files as $file) {
  $file = trim(substr($file, 1));
  if (strstr($file, '@2x')) continue;

  $filename = basename($file);
  $dir = $root . dirname($file);
  chdir($dir);
  $result = `grep $filename *`;

  if (!$result) {
    echo $dir, "\n", $filename;

    exit;
  }
}
