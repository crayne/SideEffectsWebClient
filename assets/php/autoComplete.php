<?php
//This gets medications
error_log("In autoComplete.php");
$hostName = $_SERVER["SERVER_NAME"];
error_log("hostName = ".$hostName);
$pos = strpos($hostName,"oryxtech");
if ($pos === false){
	$uname = "root";
	$pwd = "root";
        $dbname = "sideEffects";
}
else { 
	$uname = "oryxtech_sideE";
	$pwd = "RW38>!mD?R";
	$dbname = "oryxtech_sideEffects";       
}
error_log("In autoComplete.php, hostName".$hostName);
//partial drug name
$searchValue = $_POST['searchValue'];
error_log("search value after POST = ".$searchValue);
if (empty($searchValue)){
	error_log("Before GET");
	$searchValue = $_GET['searchValue'];
	error_log("After GET");
}
$searchValue = urldecode($searchValue);

$con = mysql_connect("localhost",$uname,$pwd);
if (!$con)
{
  die('Could not connect: ' . mysql_error());
}

$b = mysql_select_db($dbname, $con);
if (!$b) {
   die('Could not select database ');
}	


$query = "select distinct allDrugNames from all_drug_names where allDrugNames like '".$searchValue."%'";
	
$result = mysql_query($query);
error_log("In autoComplete.php, query result = ".$result);

while(($row = mysql_fetch_array($result,MYSQL_ASSOC)) !== FALSE){ 
	$item = $row['allDrugNames'];
	echo $item.",";	
}
echo "\n";

mysql_close($con); 

?>