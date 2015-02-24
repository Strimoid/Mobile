angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.showlogin = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $scope.loading = true;

    $timeout(function() {
      $scope.loading = false;
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ContentsCtrl', function($scope, Contents) {
  $scope.doRefresh = function() {
    $scope.contents = Contents.query();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.loadMore = function () {
    // todo: implement endless loading
  };

  $scope.doRefresh();
})
.controller('ContentCtrl', function($scope, Contents, $stateParams) {
  $scope.content = Contents.get({ id: $stateParams.id });
})
;
