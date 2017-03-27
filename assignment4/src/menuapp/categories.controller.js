(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

// 'item' is injected through state's resolve
CategoriesController.$inject = ['items']
function CategoriesController(items) {
  var categories = this;
  categories.items = (items && items.data) ? items.data : [];
}

})();
