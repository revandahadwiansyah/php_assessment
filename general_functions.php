<?php
	#GENERAL FUNCTIONS#	
	
	#check method: GET only
	function checkMethod(){
		if($_SERVER['REQUEST_METHOD'] != "GET")
			return false;
		
		return true;
	}
	
	#check params
	function checkParams($sources = null, $types = 'string'){
		if(empty($_GET))
			return false;
			
		if($sources == null || $sources == '')
			return false;
		
		if(array_key_exists($sources, $_GET) === false)
			return false;		
		
		foreach($_GET as $idx => $param){
			//echo "$idx <> $sources => $param <br>";
			if($param == null || empty($param))
				return false;
			
			switch(strtolower($types)){
				case 'string':
					$newParam = str_replace(' ', '', $_GET[$sources]);
					if($newParam == null || empty($newParam))
						return false;
					break;
					
				case 'integer':
					$newParam = preg_replace('/[^0-9\-]/', '', $_GET[$sources]);
					if($newParam < 0)
						return false;
					break;
				default:					
					break;
			}
		}
	}
		
	#String Palindrome
	function stringPalindrome($str){
		#remove all spaces
		$str = str_replace(' ', '', $str);

		#remove special characters
		$str = preg_replace('/[^A-Za-z0-9\-]/', '', $str);
		
		if(strtolower($str) !== strrev(strtolower($str)))
			return false;
			
		return true;
	}
	
	#Merge String
	function mergeString($str, $int){
		$newArr = [];
		
		#remove all spaces
		$str = str_replace(' ', '', $str);

		#allow only characters
		$str = preg_replace('/[^A-Za-z\-]/', '', $str);
		
		#splitting text
		$arrDatas = str_split($str, $int);
		
		foreach($arrDatas as $key => $arr){
			#splitting values of array
			$newArr = str_split($arr);
			
			#remove duplicated values
			$arrUniq = array_unique($newArr, SORT_STRING);
			
			#sticky all values
			$arrDatas[$key] = implode(',', $arrUniq);
		}
		
		return $arrDatas;
	}
?>
