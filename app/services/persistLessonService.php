<?php

	$jsonLesson = file_get_contents("php://input");
	$lessonObject = json_decode($jsonLesson);

	//Data base configuration.
	$serverBD = "http://sql32.hostinger.es/phpmyadmin/index.php?db=u234471085_gam1&lang=es&token=44c0248ecc5d6cfaca964651f2ca4956&phpMyAdmin=dcc72c03b07cf7def81d4739b4fc2e425ae32f43";
	$nameBD = "u234471085_gam1";
	$userBD = "	u234471085_gian";
	$passBD = "mimamamemima123";

	//Connecting to the database
	$conn = @new mysqli($serverBD,$userBD, $passBD, $nameBD);

	//Query
	$result = $conn->query("SELECT * from tema");

	//storing info from query
	$lessonArray = array();
	while($rs = mysql_fetch_array($result)){
		$lessonArray[] = $rs;
	}

	$show = json_encode($lessonArray);
	$conn->close();
	echo($show);

?>