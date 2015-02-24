// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })
      .state('app.contents', {
        url: "/contents",
        views: {
          'menuContent': {
            templateUrl: "templates/contents.html",
            controller: 'ContentsCtrl'
          }
        }
      })
      .state('app.content', {
        url: "/content/:id",
        views: {
          'menuContent': {
            templateUrl: "templates/content.html",
            controller: 'ContentCtrl'
          }
        }
      });

  $urlRouterProvider.otherwise('/app/contents');
})
.factory('Contents', function($resource) {
  return $resource('https://strimoid.pl/api/v1/contents/:id', {}, {
      'query': {
            method: 'GET',
            transformResponse: function (data) { return angular.fromJson(data).data; },
            isArray: true
        }
  });
})
.factory('Comments', function($resource) {
  return $resource('https://strimoid.pl/api/v1/comments/:id', {}, {
      'query': {
            method: 'GET',
            transformResponse: function (data) { return angular.fromJson(data).data; },
            isArray: true
        }
  });
})
.factory('Entries', function($resource) {
  return $resource('https://strimoid.pl/api/v1/entries/:id', {}, {
      'query': {
            method: 'GET',
            transformResponse: function (data) { return angular.fromJson(data).data; },
            isArray: true
        }
  });
})
.filter('cdn', function () {
    return function (path, type, w, h) {
        var url = '//static.strimoid.pl/';

        if (w && h) {
            url += w + 'x' + h + '/';
        }

        url += type + '/' + path;

        return url;
    };
});
