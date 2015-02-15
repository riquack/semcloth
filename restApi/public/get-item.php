<?php
		header("Content-Type: application/json;");
		echo "";
		
		
		$userId = isset($_GET['userId']) ? $_GET['userId'] : "";
		$itemId = isset($_GET['userId']) ? $_GET['userId'] : "";;
		$url = "http://riquack-n61vn:9000/users/" . $userId . "/wardrobe/" . $itemId;
		$method = "GET";
			
		
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		$response = curl_exec($curl);
		echo json_encode($response);
?>