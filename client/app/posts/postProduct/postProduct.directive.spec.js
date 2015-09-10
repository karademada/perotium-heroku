'use strict';

describe('Directive: postProduct', function () {

  // load the directive's module
  beforeEach(module('perotiumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-product></post-product>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the postProduct directive');
  }));
});