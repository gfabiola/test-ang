(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

// 'item' is injected through state's resolve
CategoriesController.$inject = ['categories']
function CategoriesController(categories) {
  var $ctrl = this;
  $ctrl.categories = (categories && categories.data) ? categories.data : [];
}

})();
