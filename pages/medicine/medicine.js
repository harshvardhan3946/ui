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

            var headers = {
                "Authorization": "Basic ZGF3YWFpaTokMmEkMTEkZ3hwbmV6bVlmTkpSWW53L0VwSUs1T2UwOFRsd1pEbWNtVWVLa3JHY1NHR0hYdldheFV3UTI=",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            };


            function querySearch(query) {
                if (query) {
                    var defer = $q.defer();
                    $http.get('http://localhost:8080/api/rest/medicines/' + query, {headers: headers})
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
                $log.info('Item changed to ' + JSON.stringify(item));
                $http.get('http://localhost:8080/api/rest/medicines/' + item, {headers: headers})
                    .success(function (response) {
                        response.data.details;
                    }).error(function (error) {
                        console.log(error);
                    });
            }
        });
})();