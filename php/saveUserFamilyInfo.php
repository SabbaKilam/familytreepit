<?php

	session_start();
	$userFamilyInfo = $_POST["jsonUserFamilyInfo"];
	
	file_put_contents("../familyInfo/userFamilyInfo.json", $userFamilyInfo);
	exit($userFamilyInfo);

?>