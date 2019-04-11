<?php

	session_start();
	
	$onlineUsers = json_decode( file_get_contents( "../familyInfo/onlineUsers.json" ) );
	$username =  $_SESSION["loginCredentials"];
	array_splice( $onlineUsers, array_search( $username, $onlineUsers ), 1 );
	file_put_contents( "../familyInfo/"  . "onlineUsers.json", json_encode( $onlineUsers ) );
	session_destroy();
	$_SESSION = array();
	
	exit("deny");
?>