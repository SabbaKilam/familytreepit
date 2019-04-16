<?php
	
	ignore_user_abort( true );
	session_start();
	
	$username =  $_SESSION["loginCredentials"];
	//in case browswe closes without valid username:
	$invalidValues = array(
		null,
		"null",
		"NULL",
		""
	);
	
	if( in_array( $username, $invalidValues ) ) {
		
		die();
	}
	
	$onlineUsers = json_decode( file_get_contents( "../familyInfo/onlineUsers.json" ) );
	array_splice( $onlineUsers, array_search( $username, $onlineUsers ), 1 );
	file_put_contents( "../familyInfo/"  . "onlineUsers.json", json_encode( $onlineUsers, JSON_PRETTY_PRINT ) );
	session_destroy();
	$_SESSION = array();
	
	exit("deny");
?>