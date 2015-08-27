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
  });
