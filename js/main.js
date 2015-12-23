/**
 * Created by hojha on 25/10/15.
 */
(function () {
    var app = angular.module('dawaaiiIndex', [
        'ngRoute', 'vsGoogleAutocomplete', 'uiGmapgoogle-maps', 'ngAnimate', 'ngMaterial'
    ]);

    /**
     * Configure the Routes
     */
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/", {templateUrl: "pages/home.html", controller: "PageCtrl"})
            .when("/ambulance-services", {
                templateUrl: "pages/ambulance/ambulance-services.html",
                controller: "AmbulanceCtrl"
            })
            .when("/blood-banks", {templateUrl: "pages/blood-banks.html", controller: "PageCtrl"})
            .when("/doctor-on-call", {templateUrl: "pages/doctor-on-call.html", controller: "PageCtrl"})
            .when("/equipment-on-rent", {templateUrl: "pages/equipment-on-rent.html", controller: "PageCtrl"})
            .when("/fix-an-appointment", {templateUrl: "pages/fix-an-appointment.html", controller: "PageCtrl"})
            .when("/helping-hand", {templateUrl: "pages/helping-hand.html", controller: "PageCtrl"})
            .when("/hospital-finder", {templateUrl: "pages/hospital-finder.html", controller: "PageCtrl"})
            .when("/pathlab", {templateUrl: "pages/pathlab.html", controller: "PageCtrl"})
            .when("/inhouse", {templateUrl: "pages/inhouse.html", controller: "PageCtrl"})
            .otherwise("/404", {templateUrl: "pages/404.html", controller: "PageCtrl"});
    }]);

    app.controller('PageCtrl', function ($scope, $http) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude)
                    .success(function (response) {
                        if (response.results.length >= 2) {
                            $scope.userAddress = response.results[1].formatted_address;
                        }
                        else if (response.results.length > 0) {
                            $scope.userAddress = response.results[0].formatted_address;
                        }
                    }).error(function (error) {
                        console.log(error);
                    });
            });
        }
    });
})();