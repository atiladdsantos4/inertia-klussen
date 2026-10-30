<?php
$c = curl_init("https://api.openai.com/v1/models");
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_exec($c);

echo "HTTP: " . curl_getinfo($c, CURLINFO_HTTP_CODE) . PHP_EOL;
echo "Erro: " . curl_error($c) . PHP_EOL;

curl_close($c);
