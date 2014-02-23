'use strict';

angular.module('app.controllers', [])
.controller('LoginCtrl', function($scope, $rootScope, $http, $location, $modalInstance) {
	$scope.user = {};
	$scope.errorMessage = false;
	$scope.signinerrorMessage = false;

	$scope.login = function () {
		$http.post('/api/login', {
			username: $scope.user.username,
			password: $scope.user.password,
		})
		.success(function (user) {
			$scope.message = 'Authentication successful!';
			$modalInstance.close($location.url('/home'));
		})
		.error(function () {
			$scope.message = 'Authentication failed.';
			$scope.errorMessage = true;
		});
	};

	$scope.forgotPassword = function() {
		$modalInstance.dismiss('cancel');
		$location.url('/forgot');
	}
})
.controller('SignupCtrl', function($scope, $rootScope, $http, $location, $anchorScroll, $modal) {
	$scope.user = {};
	$scope.errorMessage = false;
	$scope.isCollapsed = false;
	
	$scope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: '/views/partials/login.html',
			controller: 'LoginCtrl'
		});
	};

	$scope.signup = function () {
		$http.post('/api/register', {
			username: $scope.user.username,
			password: $scope.user.password
		})
		.success(function (user) {
			$http.post('/api/login', {
				username: $scope.user.username,
				password: $scope.user.password
			})
			.success(function (user){
				$location.url('/home');
			})
			.error(function (err){
				console.log(err);
			})
		})
		.error(function (err) {
			$scope.message = 'username already exists';
			$scope.errorMessage = true;
			$location.url('/');
		});
	};
})
.controller('HomeCtrl', function($scope, $http) {
	$scope.home = function () {
		$http.get('/api/home')
		.success(function (data, status, headers, config) {
			$scope.data = data;
			console.log('The data is ', $scope.data);
			console.log('The status is ', status);
			console.log('The headers are ', headers);
		})
		.error(function (err) {
			console.log(err);
			return;
		})
	};
})
.controller('ForgotPasswordCtrl', function($scope, $http, $location) {
	$scope.user = {};
	$scope.errorMessage = false;
	console.log('in ForgotPasswordCtrl');
	$scope.resetPassword = function () {
		$http.post('/api/forgot', {
			username: $scope.user.username
		})
		.success(function (message){
			$location.url('/')
		})
		.error(function (err) {
			$scope.message = err;
			$scope.errorMessage = true;
			console.log(err);
			return;
		})
	};
});
