'use strict';

angular.module('perotiumApp')
  .filter('productFilter', function () {
    return function (input) {
      return 'productFilter filter: ' + input;
    };
  });
