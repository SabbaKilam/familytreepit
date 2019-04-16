<?php
	
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	
	session_start();
	
	if ( ! isset( $_SESSION["loginStatus"] ) || $_SESSION["loginStatus"] == "deny" ) {
		
		die(""); 
	};
	
	//get all custom family tree info to check invitations:
	$userFamilyInfo = json_decode( file_get_contents( "../familyInfo/userFamilyInfo.json" ), true );
	$firstname = $_POST["firstname"];
	$username = md5( $_SESSION["loginCredentials"] );
	$familyInfo = $userFamilyInfo[$username];
	
	foreach( $familyInfo as $key => $value )  {
		
		if( $value["firstname"] == $firstname ) {
			
			$familyInfo[$key]["chatInvitation"] = true;
		}
	}
	
	file_put_contents( "../familyInfo/userFamilyInfo.json", json_encode( $userFamilyInfo, JSON_PRETTY_PRINT ) )

?>