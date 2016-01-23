/**
 * Created by hojha on 17/01/16.
 */
(function () {
    angular
        .module('dawaaiiIndex')
        .controller('MedicineCtrl', function ($scope, $http, $compile, $mdToast, $q, $log) {
            var self = this;
            self.querySearch = querySearch;
            self.selectedItemChange = selectedItemChange;
            self.searchTextChange = searchTextChange;
            $scope.medicineDetails = {
                name: '',
                category: '',
                dClass: '',
                unitQty: '',
                packageQty: '',
                packagePrice: '',
                unitPrice: ''
            };

            $scope.alternatives;
            var headers = {
                "Authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            };


            function querySearch(query) {
                if (query) {
                    var defer = $q.defer();
                    $http.get('http://205.147.97.187:8080/api/rest/medicines/' + query, {headers: headers})
                        .success(function (response) {
                            defer.resolve(response.data.suggestions);
                        }).error(function (error) {
                            console.log(error);
                            return "";
                        });
                    return defer.promise;
                }
            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item) {
                $scope.medicineDetails.name = item;
                $scope.medicineDetails.category = '';
                $scope.medicineDetails.dClass = '';
                $scope.medicineDetails.unitQty = '';
                $scope.medicineDetails.packageQty = '';
                $scope.medicineDetails.packagePrice = '';
                $scope.medicineDetails.unitPrice = '';
                $scope.alternatives = '';

                $log.info('Item changed to ' + JSON.stringify(item));
                $http.get('http://205.147.97.187:8080/api/rest/medicines/detail/' + item, {headers: headers})
                    .success(function (response) {
                        $log.info(response);
                        var res = response.data.details;
                        if (res) {
                            $log.info(res);
                            $scope.medicineDetails.category = res.category;
                            $scope.medicineDetails.dClass = res.dClass;
                            $scope.medicineDetails.unitQty = res.unitQty;
                            $scope.medicineDetails.packageQty = res.packageQty;
                            $scope.medicineDetails.packagePrice = res.packagePrice;
                            $scope.medicineDetails.unitPrice = res.unitPrice;
                            $scope.alternatives = res.alternatives;
                        }
                    }).error(function (error) {
                        console.log(error);
                    });
            }
        });
})();