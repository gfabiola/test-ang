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
	service.productsToBuy = [{name: "Cookie", price: 2.0}, {name: "Milk", price: 7.0}, {name: "Banana", price: 1.0}, {name: "Chocolate", price: 3.0}];
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
