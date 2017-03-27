(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', '$q', 'ApiBasePath']
function MenuDataService($http, $q, ApiBasePath) {
  var service = this;
  
  service.categoriesPromise = null;
  
  service.getAllCategories = function(){
	 if(service.categoriesPromise === null){
		 service.categoriesPromise = $http({
			  method: "GET",
			  url: (ApiBasePath + "/categories.json")
			});
	 }
	return service.categoriesPromise;
  };
  
  service.getCategory = function (categoryShortName){
	  var defered = $q.defer();
	  service.getAllCategories().then(function(categories){
		  categories = (categories && categories.data) ? categories.data : [];
		  var filtered = categories.filter(function(item){
			  return item && item.short_name === categoryShortName;
		  });
		  defered.resolve(filtered.length === 1 ? filtered[0] : []);
	  });
	  return defered.promise;
  };
  
  service.getItemsForCategory = function(categoryShortName){
	  return $http({
			  method: "GET",
			  url: (ApiBasePath + "/menu_items.json"),
			  params: {
				  category: categoryShortName
			  }
			});
  };
}

})();
