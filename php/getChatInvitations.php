<?php
	
	session_start();
	
	if ( ! isset( $_SESSION["loginStatus"] ) || $_SESSION["loginStatus"] == "deny" ) {
		
		die(""); 
	};
	
	//get all custom family tree info to check invitations:
	$userFamilyInfo = json_decode( file_get_contents( "../familyInfo/userFamilyInfo.json" ), true );
	$familyInfo = $userFamilyInfo[ $_SESSION["userCode"] ];
	$invitations = array();
	
	foreach( $familyInfo as $key => $value )  {
		
		if( isset( $value["chatInvitation"] ) && $value["chatInvitation"] ) {
			
			array_push( $invitations, $key );
		}
	}
	
	exit( json_encode( $invitations, JSON_PRETTY_PRINT ) );

?>