(function () {
    angular
        .module('dawaaiiIndex')
        .controller('AmbulanceCtrl', function ($scope, $http, ModalService) {

            //scope variables
            $scope.address = {name: '', components: {city: '', state: '', postCode: '', location: {lat: '', long: ''}}};
            $scope.options = {componentRestrictions: {country: 'IN'}};
            $scope.ambulances = [];
            $scope.userLocation = {latitude: 28.612912, longitude: 77.2295097};
            $scope.ambulanceId = '';
            $scope.map = {
                center: $scope.userLocation,
                zoom: 5,
                markers: [],
                loaded: false,
                icon: "images/ambulance.ico"
            };

            //common header for rest calls
            var url = 'http://localhost:8080/api/rest/ambulances';
            var headers = {
                "Authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            };

            function getDataFromServer() {
                $http.get(url, {headers: headers})
                    .success(function (response) {
                        $scope.ambulances = response.data.Ambulances;
                        $scope.map.markers = $scope.ambulances;
                        $scope.map.loaded = true;
                    }).error(function (error) {
                        console.log(error);
                    });
            };

            $scope.init = function () {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        $scope.userLocation.latitude = position.coords.latitude;
                        $scope.userLocation.longitude = position.coords.longitude;
                        url = url + '/sorted?lat=' + $scope.userLocation.latitude + "&lon=" + $scope.userLocation.longitude
                        console.log($scope.userLocation.latitude + "," + $scope.userLocation.longitude);
                        getDataFromServer();
                    });
                }
                getDataFromServer();
            };

            $scope.init();

            $scope.fetchData = function () {
                console.log("user asking to search " + this.address.components.city + ", " + this.address.components.state + ", " + this.address.components.postCode + ", " + this.address.components.location.lat + ", " + this.address.components.location.long);
            };

            $scope.book = function (ambulanceId) {
                var bookData = {};
                console.log("user asking to book with ambulance id " + ambulanceId);
                bookData.ambulanceId = ambulanceId;
                ModalService.showModal({
                    templateUrl: "pages/ambulance/amb-bookingform.html",
                    controller: "ComplexController",
                    inputs: {
                        title: "Provide details"
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result.name + ", " + result.email + ", " + result.contact);
                        if (result.email != null) {
                            bookData.email = result.email;
                            //now give a post request to book ambulance
                            $http.post('http://localhost:8080/api/rest/ambulances/book', bookData, {
                                headers: headers
                            }).success(function (response) {
                                console.log(response);
                            }).error(function (error) {
                                console.log(error);
                            });
                        }
                    });
                });
            };
        });

    angular
        .module('dawaaiiIndex')
        .controller('ComplexController', ['$scope', '$element', 'title', 'close', function ($scope, $element, title, close) {
            $scope.name = null;
            $scope.email = null;
            $scope.contact = null;
            $scope.title = title;
            //  This close function doesn't need to use jQuery or bootstrap, because
            //  the button has the 'data-dismiss' attribute.
            $scope.close = function () {
                close({
                    name: $scope.name,
                    email: $scope.email,
                    contact: $scope.contact
                }, 500); // close, but give 500ms for bootstrap to animate
            };
            //  This cancel function must use the bootstrap, 'modal' function because
            //  the doesn't have the 'data-dismiss' attribute.
            $scope.cancel = function () {
                //  Manually hide the modal.
                $element.modal('hide');
                //  Now call close, returning control to the caller.
                close({
                    name: $scope.name,
                    email: $scope.email,
                    contact: $scope.contact
                }, 500); // close, but give 500ms for bootstrap to animate
            };
        }]);
})();