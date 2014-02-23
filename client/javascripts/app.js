'use strict';

var app = angular.module('app', ['app.controllers','ngRoute','ngResource', 'angularSlideables', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();

      $http.get('/api/loggedin')
      .success(function (user) {
        if (user !== '0')
          $timeout(deferred.resolve, 0);
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function (){deferred.reject();}, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $httpProvider.responseInterceptors.push(function ($q, $location) {
      return function (promise) {
        return promise.then(
          function (response) {
            return response;
          }, 
          function (response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });

    $routeProvider
      .when('/', {
        templateUrl: '/views/partials/main.html',
        controller: 'SignupCtrl'
      })
      .when('/home', {
        templateUrl: '/views/partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/loginpage', {
        templateUrl: '/views/partials/loginPage.html',
        controller: 'LoginCtrl'
      })
      .when('/forgot', {
        templateUrl: '/views/partials/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function($rootScope, $http, $location, $anchorScroll) {
    $rootScope.message = '';

    $rootScope.scrollTo = function (id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      $location.hash(old);
    };

    $rootScope.logout = function () {
      $rootScope.message = 'Logged out.';
      $http.post('/api/logout')
      .error(function (err){
        console.log('error while logging out');
      });
    };
  });