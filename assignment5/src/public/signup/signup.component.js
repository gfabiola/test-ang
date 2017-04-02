(function () {
"use strict";

angular.module('public')
.component('signUpForm', {
  templateUrl: 'src/public/signup/signup-form.html',
  controller: SignUpController
})
.directive('preferenceValidation', PreferenceValidation);


PreferenceValidation.$inject = ['$q', 'MenuService'];
function PreferenceValidation($q, MenuService){
	return{
      require:'ngModel',
      link:function($scope, element, attrs, ngModel){
        ngModel.$asyncValidators.preferenceValid=function(userInput){
          return MenuService.getMenuItem(userInput).then(function(item){
			  return true;
		  }, function(){
			  return $q.reject('does not exist');
		  });
        }
      }
    }
}


SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var $ctrl = this;
  $ctrl.user = UserService.getUser() || null;
  $ctrl.saved = false;
  
  
  $ctrl.register = function(){
	UserService.saveUser($ctrl.user);
	$ctrl.saved = true;
  };
  
}

})();
