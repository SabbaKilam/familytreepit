<?php
	$string = $_POST["string"];
	exit( md5( $string ) );
?>