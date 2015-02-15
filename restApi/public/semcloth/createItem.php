<?php
		header("Content-Type: application/json;");
		echo "";
		
		
		$userId = isset($_GET['userId']) ? $_GET['userId'] : "";
		
		$url = "http://riquack-n61vn:9000/users/" . $userId . "/wardrobe";
		$method = "POST";
			
		$jsonData = json_encode($_POST, JSON_UNESCAPED_SLASHES);
		
		$curl = curl_init($url);
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonData);
		curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($jsonData)));
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

		$response = curl_exec($curl);
		echo json_encode(["response" => $response, "error" => curl_error($curl), "load" => $jsonData, "url" => $url]);
?>