'use strict';

angular.module('perotiumApp')
    .controller('NavbarCtrl', function ($rootScope, $scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Posts',
                'link': '/posts'
            }
        ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };

        $scope.createPost = function () {
            $rootScope.$emit('CreateEvent')
        }
    });
