(function () {
"use strict";

angular.module('public')
.component('userInfo', {
  templateUrl: 'src/public/myinfo/user-info.html',
  bindings: {
    user: '<',
	preference: '<'
  }
});

})();
