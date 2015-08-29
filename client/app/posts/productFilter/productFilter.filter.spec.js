'use strict';

describe('Filter: productFilter', function () {

  // load the filter's module
  beforeEach(module('perotiumApp'));

  // initialize a new instance of the filter before each test
  var productFilter;
  beforeEach(inject(function ($filter) {
    productFilter = $filter('productFilter');
  }));

  it('should return the input prefixed with "productFilter filter:"', function () {
    var text = 'angularjs';
    expect(productFilter(text)).toBe('productFilter filter: ' + text);
  });

});
