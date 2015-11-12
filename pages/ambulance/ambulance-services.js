(function () {
    angular
        .module('dawaaiiIndex')
        .controller('AmbulanceCtrl', function ($scope, $http) {

            $scope.ambulances = {};

            $scope.init = function () {
                var headers = {
                    "Authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                    "Content-Type": "application/json"
                };

                $http.get('http://localhost:8080/api/rest/ambulances', {
                    headers: headers
                }).success(function (response) {
                    $scope.ambulances = response.data.Ambulances;
                }).error(function (error) {
                    console.log(error);
                });
            };
            $scope.init();

            $scope.options = {
                componentRestrictions: {country: 'IN'}
            };

            $scope.address = {
                name: '',
                components: {
                    city: '',
                    state: '',
                    postCode: '',
                    location: {
                        lat: '',
                        long: ''
                    }
                }
            };

            $scope.fetchData = function () {
                console.log("user asking to search " + this.address.components.city + ", " + this.address.components.state + ", " + this.address.components.postCode + ", " + this.address.components.location.lat + ", " + this.address.components.location.long);

            };

            var arrMarkers = [
                {
                    id: "home",
                    name: "home",
                    latitude: 28.4650453, //valid coords
                    longitude: 77.10071169999992, //valid coords
                    options: {
                        animation: google.maps.Animation.BOUNCE
                    }
                },
                {
                    id: "placeAId",
                    name: "Place A",
                    latitude: 28.5838004, //valid coords
                    longitude: 77.35971940000002 //valid coords
                },
                {
                    id: "placeBId",
                    name: "Place B",
                    latitude: 27.1766701, //valid coords
                    longitude: 78.00807450000002 //valid coords
                },
                {
                    id: "placeCId",
                    name: "Place C",
                    latitude: 28.6314512, //valid coords
                    longitude: 77.21666720000007 //valid coords
                }
            ];

            $scope.map = {
                center: {latitude: 28.612912, longitude: 77.2295097},
                zoom: 11,
                markers: arrMarkers,
                icon: "images/ambulance.ico"
            };
        });
})();