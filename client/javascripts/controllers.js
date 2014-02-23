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
	
})
.controller('HomeCtrl', function($scope, $http) {
	
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
