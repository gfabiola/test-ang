(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);


MyInfoController.$inject = ['MenuService', 'UserService'];
function MyInfoController(MenuService, UserService){
	var $ctrl = this;
	$ctrl.user = UserService.getUser();
	if($ctrl.user && $ctrl.user.preference){
		MenuService.getMenuItem($ctrl.user.preference).then(function(item){
			$ctrl.preference = item;
		});
	}
}

})();
