<?php

	//always do this:
	session_start(); 
	
	// initialize "on the safe side":
	$_SESSION["loginStatus"] = "deny";
	
	// initialize with standard info
	$_SESSION["familyInfo"] = file_get_contents( "../familyInfo/familyInfo.json" ); 
	
	//get all custom family tree info to check credentials:
	$userFamilyInfo = json_decode( file_get_contents( "../familyInfo/userFamilyInfo.json" ) );
	$loginName = $_POST["loginName"];
	$userCode = md5($loginName);
	$_SESSION["loginCredentials"] = $_POST["loginName"];
	
	//check login credentials
	foreach( $userFamilyInfo as $key => $value ) {
		
		if ( $key == $userCode ) {
			
			$_SESSION["loginStatus"] = "allow";
			$_SESSION["userCode"] = $userCode;
			//restore to string value:
			$_SESSION["familyInfo"] = json_encode( $value );
			$onlineUsers = json_decode( file_get_contents( "../familyInfo/onlineUsers.json" ) );
			
			if ( $onlineUsers == null ) {
				
				$onlineUsers = array();
			}
			
			if( ! in_array( $loginName, $onlineUsers ) ) {
				
				array_push( $onlineUsers, $loginName );
			}
			
			file_put_contents( "../familyInfo/onlineUsers.json", json_encode( $onlineUsers ) );
			break;
		}
	}
	

	exit( $_SESSION["loginStatus"] );
	
?>