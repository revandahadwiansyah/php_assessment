<?php
	include "../general_functions.php";
	$res = [
		"status" 	=> true,
		"msg"		=> "",
		"code"		=> 200
	];
			
	try{				
		#check method= GET	
		if(checkMethod() === false){
			$res = [
				"status" 	=> false,
				"msg"		=> "invalid method",
				"code"		=> 1
			];
			echo json_encode($res);
			return false;
		}
				
		#check params
		if(checkParams("input1") === false){
			$res = [
				"status" 	=> false,
				"msg"		=> "invalid params",
				"code"		=> 2
			];
			echo json_encode($res);	
			return false;
		}
			
		/*
			* assessment 1
			* params: input1
		*/
		$input1 = strtolower($_GET["input1"]);
		if(stringPalindrome($input1) === true){
			$res = [
				"status" 	=> true,
				"msg"		=> "success",
				"code"		=> 200,
				"data" 		=> "true"						
			];					
		} else {
			$res = [
				"status" 	=> true,
				"msg"		=> "success",
				"code"		=> 200,
				"data" 		=> "false"						
			];		
		}
		echo json_encode($res);
		return true;
	
		} catch(Exception $e){
			$res = [
				"status" 	=> false,
				"msg"		=> $e,
				"code"		=> 99
			];
			echo json_encode($res);	
			return false;
		}	
?>