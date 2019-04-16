<?php

	session_start();

	
	$familyInfo = file_get_contents( "../familyInfo/familyInfo.json" );
	
	if ( isset( $_SESSION["familyInfo"] ) ) {
		
		$familyInfo = $_SESSION["familyInfo"];	
	}
	
	exit( $familyInfo );


		
?>