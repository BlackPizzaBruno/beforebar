<?php
$dbname = 'beforecraft';

if (!mysql_connect('beforebacraft.mysql.db', 'beforebacraft', 'Before2015')) {
   echo 'Impossible de se connecter à MySQL';
   exit;
}

$sql = "SHOW TABLES FROM $dbname";
$result = mysql_query($sql);

if (!$result) {
   echo "Erreur DB, impossible de lister les tables\n";
   echo 'Erreur MySQL : ' . mysql_error();
   exit;
}

while ($row = mysql_fetch_row($result)) {
   echo "Table : {$row[0]}\n";
}

mysql_free_result($result);
?>
