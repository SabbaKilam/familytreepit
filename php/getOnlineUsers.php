<?php

/**
 * The beta version of this app, will poll the php files for any updated data.
 * This file, will loop through our data consisting of everyone's saved family
 * tree, and note the online users in an array.  We will then send the array
 * back to the client and the client will mark the according users on their tree
 * as online using their unique identifier.
 * 
 * Isaac
 */

	exit( file_get_contents( "../familyInfo/onlineUsers.json" ) );
?>