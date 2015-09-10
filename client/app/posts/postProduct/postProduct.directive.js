'use strict';

angular.module('perotiumApp')
  .directive('postProduct', function () {
    return {
      template: '<div></div>',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.text('this is the postProduct directive');
      }
    };
  });