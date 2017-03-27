(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective(){
	return  {
		templateUrl: 'foundItems.html',	
		scope: {
		  items: '<',
		  onRemove: '&'
		}
	  };
}

NarrowItDownController .$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
	var narrowItDown = this;
	narrowItDown.searchTerm = "";
	narrowItDown.found = [];
	narrowItDown.searchDone = false;
	
	narrowItDown.narrowIt = function(){		
		if(!narrowItDown.searchTerm || narrowItDown.searchTerm == ""){
			narrowItDown.found = [];
			narrowItDown.searchDone = true;
			return;
		}
		MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(function(result){
			narrowItDown.found = result;
			narrowItDown.searchDone = true;
		});
	};
	
	narrowItDown.remove = function(index){
		narrowItDown.found.splice(index, 1);
	};
}

MenuSearchService .$inject = ['$q', '$http', 'ApiBasePath'];
function MenuSearchService($q, $http, ApiBasePath){
	var service = this;
	service.menuItemsPromise = null;
	
	
	service.getMenuItems = function(){		
		if(service.menuItemsPromise === null){
			service.menuItemsPromise = $http({
			  method: "GET",
			  url: (ApiBasePath + "/menu_items.json")
			});
		}
		return service.menuItemsPromise;
	};
	
	service.getMatchedMenuItems = function(searchTerm){
		return service.getMenuItems().then(function(result){
			var menuItems = (result && result.data && result.data.menu_items) ? result.data.menu_items : [];
			var filteredItems = menuItems.filter(function(element){
				return element.name && element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
			});
			return filteredItems;
		});
	};
}

})();
