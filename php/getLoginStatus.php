<?php

	session_start();
	
	if (    isset( $_SESSION["loginStatus"] )   ){
		exit(  $_SESSION["loginStatus"]  );		
	}
	else {
		exit( "deny" );
	}

?>