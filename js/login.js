/**
 * Created by hojha on 29/10/15.
 */
angular.module('login', ['ngRoute']).config(function ($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
        templateUrl: 'home.html',
        controller: 'home'
    }).when('/login', {
        templateUrl: 'login.html',
        controller: 'navigation'
    }).otherwise('/');

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

}).controller('navigation',
    function ($rootScope, $scope, $http, $location, $route) {

        $scope.tab = function (route) {
            return $route.current && route === $route.current.controller;
        };

        var authenticate = function (credentials, callback) {
            var headers = {
                "authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var data = credentials ? {
                username: credentials.username,
                password: credentials.password,
                grant_type: "password"
            } : {};
            if (credentials)
                $http.post('http://205.147.97.187/api/rest/oauth/token?grant_type=password&username=' + data.username + '&password=' + data.password, data, {
                    headers: headers
                }).success(function (response) {
                    console.log(response);
                    if (response.access_token) {
                        $rootScope.authenticated = true;
                        $rootScope.access_token = response.access_token;
                        $rootScope.refresh_token = response.refresh_token;
                        $rootScope.expires_in = response.expires_in;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback($rootScope.authenticated);
                }).error(function (error) {
                    console.log(error);
                    $rootScope.authenticated = false;
                    callback && callback(false);
                });
        }

        $scope.credentials = {};
        $scope.login = function () {
            authenticate($scope.credentials, function (authenticated) {
                if (authenticated) {
                    console.log("authentication succeeded");
                    $location.path("/");
                    $scope.error = false;
                    $rootScope.authenticated = true;
                } else {
                    console.log("authentication failed");
                    $location.path("/login");
                    $scope.error = true;
                    $rootScope.authenticated = false;
                }
            })
        };

        $scope.logout = function () {
            $http.post('logout', {}).success(function () {
                $rootScope.authenticated = false;
                $rootScope.access_token = null;
                $rootScope.refresh_token = null;
                $rootScope.expires_in = null;
                $location.path("/");
            }).error(function () {
                console.log("Logout failed")
                $rootScope.authenticated = false;
            });
        }

    }).controller('home', function ($scope, $http) {
        $http.get('/').success(function () {
        })
    });
