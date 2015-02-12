<?php
		header("Content-Type: application/json;");
		echo "";
		
		
		$userId = isset($_GET['userId']) ? $_GET['userId'] : "";
		$clothingId = isset($_GET['user']) ? $_GET['clothingId'] : "";
		
		$endpoints = [
		"events" => "http://riquack-n61vn:9000/events",
		"clothingTypes" => "http://riquack-n61vn:9000/clothingTypes",
		"clothingSizes" => "http://riquack-n61vn:9000/clothingSizes",
		"clothingTextures" => "http://riquack-n61vn:9000/clothingTextures",
		"clothingStyles" => "http://riquack-n61vn:9000/clothingStyles",
		"religions" => "http://riquack-n61vn:9000/religions",
		"seasons" => "http://riquack-n61vn:9000/seasons",
		"weatherConditions" => "http://riquack-n61vn:9000/weatherConditions",
		"clothingMaterials" => "http://riquack-n61vn:9000/clothingMaterials",
		"wardrobe" => "http://riquack-n61vn:9000/users/" + $userId + "/wardrobe",
		"wardrobeItem" => "http://riquack-n61vn:9000/users/" + $userId + "/wardrobe/" + $clothingId
		];
		
		
		$url = $endpoints[$_GET['endpoint']];
		$method = $_GET["method"];
			
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($curl);
		
		echo $response;
?>