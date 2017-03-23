(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
	toBuy.products = ShoppingListCheckOffService.getProductsToBuy();
	
	toBuy.buy = function(productIndex){
		ShoppingListCheckOffService.buy(productIndex);
	};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var alreadyBought = this;
	alreadyBought.products = ShoppingListCheckOffService.getProductsAlreadyBought();
}

function ShoppingListCheckOffService(){
	var service = this;
	service.productsToBuy = [{name: "Chip", quantity: 1}, {name: "Cookie", quantity: 2}, {name: "Milk", quantity: 7}, {name: "Banana", quantity: 1}, {name: "Chocolate", quantity: 3}];
	service.productsAlreadyBought =[];
	
	service.getProductsToBuy = function(){		
		return service.productsToBuy;
	};
	
	service.getProductsAlreadyBought = function(){		
		return service.productsAlreadyBought;
	};
	
	service.buy = function(productIndex){
		service.productsAlreadyBought.push(service.productsToBuy[productIndex]);
		service.productsToBuy.splice(productIndex, 1);
	};
}

})();
