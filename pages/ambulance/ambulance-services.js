(function () {
    angular
        .module('dawaaiiIndex')
        .controller('AmbulanceCtrl', function ($scope, $http) {

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
                var p = document.getElementById(ambulanceId);
                var newElement = document.createElement('p');
                //newElement.setAttribute('id', elementId);
                newElement.innerHTML = '<fieldset><legend><label>Enter Details</label></legend><br/><input type="text" id="name" name="name" placeholder="Name" value="" required=""> <input type="text" id="pemail" name="email" placeholder="Email" value="" required=""> <input type="text" maxlength="12" id="pphone" name="phone" placeholder="Phone Number" required=""><input type="button" name="submit" value="NEXT"></fieldset>';
                p.appendChild(newElement);
                // Removes an element from the document
                //var element = document.getElementById(elementId);
                //element.parentNode.removeChild(element);
            };
        });
})();