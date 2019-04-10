<?php

	session_start();
	
	$onlineUsers = json_decode( file_get_contents( "../familyInfo/onlineUsers.json" ) );
	array_splice( $onlineUsers, array_search( $_SESSION["userCode"] ), 1 );
	file_put_contents( "../familyInfo/"  . "onlineUsers.json", json_encode( $onlineUsers ) );
	session_destroy();
	$_SESSION = array();
	
	exit("deny");
?>