<?php

	session_start();
	ini_set('display_errors', 'On');	
	
	$familyInfoJson = file_get_contents("php://input");
	
	if ( isset( $_SESSION["userCode"] ) ) {
		$userFamilyInfo = json_decode( file_get_contents( "../familyInfo/userFamilyInfo.json" ), true );
		$userFamilyInfo[$_SESSION["userCode"]] = json_decode( $familyInfoJson, true );
		
		$userFamilyInfoJson = json_encode( $userFamilyInfo );
		file_put_contents( "../familyInfo/"  . "userFamilyInfo.json", $userFamilyInfoJson );		
	}
	
	exit( $familyInfoJson );
?>	