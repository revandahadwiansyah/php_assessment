<?php
	/*
		* assessment 2
		* params: input1, input2
	*/
	
	#import general functions
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
		if(checkParams("input1") === false || checkParams("input2", "integer") === false){
			$res = [
				"status" 	=> false,
				"msg"		=> "invalid params",
				"code"		=> 2
			];
			echo json_encode($res);	
			return false;
		}
			
		#merge string
		$input1 = strtolower($_GET["input1"]);
		$input2 = strtolower($_GET["input2"]);
		$values = mergeString($input1, $input2);
		
		$res = [
			"status" 	=> true,
			"msg"		=> "success",
			"code"		=> 200,
			"data" 		=> $values						
		];	
		
		echo json_encode($res);
		return true;
	
		} catch(Exception $e){
			$res = [
				"status" 	=> false,
				"msg"		=> "oops, something wrong",
				"code"		=> 99
			];
			echo json_encode($res);	
			return false;
		}	
?>