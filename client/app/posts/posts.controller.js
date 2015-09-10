(function () {
    'use strict';

    angular.module('perotiumApp')
        .controller('PostsCtrl', postController)

    function postController($scope, $rootScope, $http, socket, $log, Auth, $modal, $mdSidenav, $mdDialog) {
        /* jshint validthis: true */
        var vm = this;

        vm.newUrl = 'http://www.fnac.com/Apple-iPhone-6-16-GO-4-7-gris-sideral/a7716985/w-4';
        vm.name = '';
        vm.title = '';
        vm.link = '';
        vm.upvotes = 0;
        vm.comments = Object;
        vm.product = Object;


        vm.isLoggedIn = Auth.isLoggedIn;
        vm.isAdmin = Auth.isAdmin;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.open = open;
        vm.openSideNav = openSideNav;
        vm.addComment = addComment;
        vm.createPostForm = createPostForm;
        vm.createProduct = createProduct;
        vm.takeProduct = takeProduct;
        vm.items = ['item1', 'item2', 'item3'];

        vm.animationsEnabled = true;
        vm.isPostFormClose = true;


        function open(size) {
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

        function openSideNav() {
            $mdSidenav('right').open()
                .then(function () {
                    $log.debug("open RIGHT is done");
                });
        }


        $http.get('/api/products').success(function (allProducts) {
            console.log('allProducts');
            vm.allProducts = allProducts;
            console.log(vm.allProducts);
            socket.syncUpdates('post', vm.allProducts);
        });

        $http.get('/api/posts').success(function (allPosts) {
            console.log('allPost');
            vm.allPosts = allPosts;
            console.log(vm.allPosts);
            //socket.syncUpdates('post', vm.allProducts);
        });

        function addComment() {
            var req = {
                method: 'POST',
                url: '/api/comments',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: {name: vm.form.name, body: vm.form.body, author: Object, post: Object}
            };
            $http.post(req).success(function (comment) {
                console.log(comment)
            })
        }

        $rootScope.$on('CreateEvent', function (event) {
            vm.showAdvanced(event);
        })

        vm.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: "modal.html",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        function createPostForm(post) {
            /* if (vm.post.name === '') {
             return;
             }*/
            console.info('create post----------')
            console.log(vm.productSelected);
            console.log(post);

            vm.isPostFormClose = false;

            var req = {
                method: 'POST',
                url: '/api/posts',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    title: post.title,
                    link: vm.productSelected.url,
                    upvotes: post.vote,
                    product: vm.productSelected,
                    comments: {
                        name: post.name,
                        body: post.comment,
                        author: vm.getCurrentUser,
                        post: post,
                        date: new Date()
                    }
                }
            };

            console.log(req.data);

            $http(req).success(function (data, status) {
                console.log(data);
                console.log(status);
            }).error(function (err) {
                console.log(err);
            })
            vm.newUrl = '';
        };

        function createProduct() {
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
                    'Accept': 'application/json'
                },
                data: {url: vm.newUrl, name: '', prix: '', image: '', categorie: '', upvotes: 0, comments: Object}
            };

            $http(req).success(function (data, status) {
                console.log(data);
                console.log(status);
            }).error(function (err) {
                console.log(err);
            });

            socket.syncUpdates('product', vm.allPosts);
            vm.newUrl = '';
        };

        function takeProduct(post) {
            console.log(post);
            vm.productSelected = angular.copy(post);
        }
    }


})();
