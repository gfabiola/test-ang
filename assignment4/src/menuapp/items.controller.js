(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['items', 'category']
function ItemsController(items, category) {
  var itemsContent = this;
  itemsContent.items = (items && items.data && items.data.menu_items) ? items.data.menu_items : [];
  itemsContent.category = category;
}

})();
