(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.food = "";
	$scope.result = "";
	$scope.message = "";
	$scope.options = {
		"too-much" : "Too much!",
		"enjoy": "Enjoy!",
		"empty": "Please enter data first"
	};
	
	$scope.checkFood = function(){
		var dishes = $scope.getDishes($scope.food);		
		if(dishes.length === 0){
			$scope.result = "empty";
		}else if(dishes.length <= 3){
			$scope.result = "enjoy";
		}else{
			$scope.result = "too-much";
		}
		$scope.message = $scope.options[$scope.result] ;
	}
	
	$scope.getDishes = function(foodString){
		if(typeof foodString !== "string" || foodString === ""){
			return [];
		}
		return foodString.split(",").filter(function(element){
			return element.trim().length > 0;
		});
	}
  
}

})();
