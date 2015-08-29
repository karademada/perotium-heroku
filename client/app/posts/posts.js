'use strict';

angular.module('perotiumApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsCtrl',
        controllerAs: 'postctrl'
      });
  }).config(function ($mdIconProvider,$mdThemingProvider) {
    $mdIconProvider
      .iconSet('action', 'assets/images/products/delete.svg', 24)
      .defaultIconSet('assets/images/products/delete.svg', 24);
      $mdThemingProvider.theme('default')
          .primaryPalette('grey')
  })
