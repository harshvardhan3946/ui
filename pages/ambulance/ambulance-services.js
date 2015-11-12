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
        });
})();