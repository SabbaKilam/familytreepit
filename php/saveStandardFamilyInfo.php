<?php

	session_start();
	
	$standardFamilyInfoJson = $_POST["standardFamilyInfo"];
	file_put_contents( "../familyInfo/familyInfo.json", $standardFamilyInfoJson );
?>