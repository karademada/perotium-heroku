(function() {
  'use strict';

angular.module('perotiumApp')
  .controller('PostsCtrl',postController)

  function postController($scope, $http, socket,$log,Auth, $modal) {
    /* jshint validthis: true */
    var vm = this;

    vm.newUrl = 'http://www.fnac.com/Apple-iPhone-6-16-GO-4-7-gris-sideral/a7716985/w-4';
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;


    vm.items = ['item1', 'item2', 'item3'];

    vm.animationsEnabled = true;

    vm.open = function (size) {
      $log.log('yo')
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'PostsCtrl',
        controllerAs: 'postctrl',
        size: size,
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };

    }


    $http.get('/api/products').success(function(allPosts) {
      console.log('allPosts');
      vm.allPosts = allPosts;
      console.log(vm.allPosts);
      socket.syncUpdates('post', vm.allPosts);
    });

     vm.addComment = function addComment(){
       var req = {
         method: 'POST',
         url: '/api/comments',
         headers: {
           'Content-Type': 'application/json',
           'Accept':'application/json'
         },
         data: {name:vm.form.name,body:vm.form.body,author:Object,post:Object}
       };
       $http.post(req).success(function(comment){
           console.log(comment)
       })
     }

    vm.createPost = function () {
      if (vm.newUrl === '') {
        return;
      }


      var req = {
        method: 'POST',
        url: '/api/posts',
        headers: {
          'Content-Type': application/json
        },
        data: {url: vm.newUrl}
      };

      $http(req).success(function(data,status){
         console.log(data);
         console.log(status);
      }).error(function(err){
         console.log(err);
      })
      vm.newUrl = '';
    };

    vm.createProduct = function () {
      if (vm.newUrl === '') {
        return;
      }

      $log.info(vm.newUrl);

      //$http.post('/api/products', {url: vm.newUrl,name:'',prix:'',image:''});
      var req = {
        method: 'POST',
        url: '/api/products',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'
        },
        data: {url: vm.newUrl,name:'',prix:'',image:'',categorie:'',upvotes:0,comments:Object}
      };

      $http(req).success(function(data,status){
        console.log(data);
        console.log(status);
      }).error(function(err){
        console.log(err);
      });

      socket.syncUpdates('product', vm.allPosts);
      vm.newUrl = '';
    };

     vm.takeProduct = function (post){
        console.log(post);
             vm.productSelected = angular.copy(post);
     }
  }


})();
