(function () {
    angular
        .module('dawaaiiIndex')
        .controller('AmbulanceCtrl', function ($scope, $http, $compile, $mdToast, $interval) {

            //scope variables
            $scope.address = {name: '', components: {city: '', state: '', postCode: '', location: {lat: '', long: ''}}};
            $scope.options = {componentRestrictions: {country: 'IN'}};
            $scope.ambulances = [];
            $scope.userLocation = {latitude: 28.612912, longitude: 77.2295097};
            $scope.ambulanceId = '';
            $scope.withinResult = false;
            $scope.pac = '';
            $scope.ambtype = '';
            var bookData = {};
            $scope.map = {
                center: $scope.userLocation,
                zoom: 15,
                markers: [],
                loaded: false
            };

            //common header for rest calls
            var url = 'http://localhost:8080/api/rest/ambulances';
            var headers = {
                "Authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            };

            //check for updated ambulance from server
            $interval(function () {
                $scope.update();
            }, 10000);

            $scope.update = function () {
                var ts = (new Date()).getTime();
                var totalAmbulances = $scope.ambulances.length;
                $http.get('http://localhost:8080/api/rest/ambulances/updates/' + (ts - 10000), {headers: headers})
                    .success(function (response) {
                        var ambulances = response.data.Ambulances;
                        for (var i = 0; i < ambulances.length; i++) {
                            for (var j = 0; j < totalAmbulances; j++) {
                                if ($scope.ambulances[j].id === ambulances[i].id) {
                                    $scope.ambulances[j].latitude = ambulances[i].latitude;
                                    $scope.ambulances[j].longitude = ambulances[i].longitude;
                                }
                            }
                        }
                    }).error(function (error) {
                        console.log(error);
                    });
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

            $scope.enquire = function (ambulanceId) {
                console.log("user asking to enquire ambulance " + ambulanceId);
                bookData.ambulanceId = ambulanceId;
                var p = document.getElementById(ambulanceId);
                var formElem = document.getElementById(ambulanceId + "form");
                if (formElem) {
                    $(formElem).fadeOut(500, function () {
                        $(this).remove();
                    });
                } else {
                    var newElement = document.createElement('p');
                    newElement.setAttribute('id', ambulanceId + "form");
                    newElement.innerHTML = '<fieldset><legend><label>Enter Details</label></legend><form name="enqform" ng-submit="enqform.$valid && book(\'' + ambulanceId + '\')" novalidate><span ng-show="enqform.$submitted && enqform.$invalid" style="color: #f4151a">All Fields are mandatory.</span><br/><span ng-show="enqform.$submitted && enqform.email.$error.email" style="color: #f4151a">Invalid Email address.</span><br/><input type="text" id="name" placeholder="Name" ng-model="name" required> <input type="email" name="email" id="email" placeholder="Email" ng-model="email" required> <input type="text" maxlength="12" id="contact" placeholder="Phone Number" ng-model="contact" required><button type="submit" class="shadow">PROCEED</button></form></fieldset>';
                    $(newElement).hide().appendTo(p).fadeIn(500);
                    $compile(newElement)($scope);
                }
            };

            $scope.book = function (ambulanceId) {
                console.log("user asking to enquire ambulance " + ambulanceId);
                var p = document.getElementById(ambulanceId);
                bookData.name = $scope.name;
                bookData.email = $scope.email;
                bookData.number = $scope.contact;
                //now give a post request to book ambulance
                $http.post('http://localhost:8080/api/rest/ambulances/book', bookData, {
                    headers: headers
                }).success(function (response) {
                    console.log(response);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Enquiry sent for ambulance !')
                            .position('right')
                            .hideDelay(5000)
                    );
                }).error(function (error) {
                    console.log(error);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Error sending enquiry for ambulance !')
                            .position('right')
                            .hideDelay(5000)
                    );
                });
                //now remove this form
                if (p) {
                    $(p).fadeOut(500, function () {
                        $(this).remove();
                    });
                }
            };

            $scope.turnOffAutoComplete = function () {
                if ($scope.pac == '') {
                    $scope.pac = $(".pac-container");
                }
                if ($scope.withinResult) {
                    $(".pac-container").remove();
                } else {
                    $scope.pac.appendTo('body');
                }
            };
        });
})();