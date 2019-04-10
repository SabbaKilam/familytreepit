<?php
	
	session_start();
	
	if ( $_SESSION["loginStatus"] == "deny" ){
		die(""); 
	};
	
	//get all custom family tree info to check invitations:
	$userFamilyInfo = json_decode( file_get_contents( "../familyInfo/userFamilyInfo.json" ) );
	
	$familyInfo = $userFamilyInfo[ $_SESSION["userCode"] ];
	
	exit($familyInfo);
	


?>