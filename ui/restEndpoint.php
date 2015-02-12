<?php
		header("Content-Type: application/json; charset=utf-8");
		echo "";
		
		$endpoints = [
		"events" => "http://riquack-n61vn:9000/events",
		"clothingTypes" => "http://riquack-n61vn:9000/clothingTypes",
		"clothingSizes" => "http://riquack-n61vn:9000/clothingSizes",
		"clothingStyles" => "http://riquack-n61vn:9000/clothingStyles",
		"religions" => "http://riquack-n61vn:9000/religions",
		"seasons" => "http://riquack-n61vn:9000/seasons",
		"weatherConditions" => "http://riquack-n61vn:9000/weatherConditions",
		"clothingMaterials" => "http://riquack-n61vn:9000/clothingMaterials",
		"colors" => "http://riquack-n61vn:9000/colors",
		"events" => "http://riquack-n61vn:9000/events",
		"events" => "http://riquack-n61vn:9000/events",
		"events" => "http://riquack-n61vn:9000/events",
		"events" => "http://riquack-n61vn:9000/events",
		"events" => "http://riquack-n61vn:9000/events",
		];
		
		
		$url = $endpoints[$_GET['endpoint']];
		$method = $_GET["method"];
			
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		$response = curl_exec($curl);
		
		echo json_encode($response);
?>