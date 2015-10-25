/**
 * Created by hojha on 25/10/15.
 */
var app = angular.module('dawaaiiIndex', [
    'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        // Home
        .when("/", {templateUrl: "pages/home.html", controller: "PageCtrl"})
        // Pages
        .when("/ambulance-services", {templateUrl: "pages/ambulance-services.html", controller: "PageCtrl"})
        .when("/blood-banks", {templateUrl: "pages/blood-banks.html", controller: "PageCtrl"})
        .when("/doctor-on-call", {templateUrl: "pages/doctor-on-call.html", controller: "PageCtrl"})
        .when("/equipment-on-rent", {templateUrl: "pages/equipment-on-rent.html", controller: "PageCtrl"})
        .when("/fix-an-appointment", {templateUrl: "pages/fix-an-appointment.html", controller: "PageCtrl"})
        .when("/helping-hand", {templateUrl: "pages/helping-hand.html", controller: "PageCtrl"})
        // else 404
        .otherwise("/404", {templateUrl: "pages/404.html", controller: "PageCtrl"});
}]);


app.controller('PageCtrl', function (/* $scope, $location, $http */) {
});