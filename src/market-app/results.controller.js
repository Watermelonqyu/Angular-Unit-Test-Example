(function() {

    'use strict';

    var companyApp = angular.module('companyApp');

    companyApp
        .controller('ResultsController', ['$scope', 'omdbApi', '$state', '$exceptionHandler', function($scope, omdbApi, $state, $exceptionHandler) {

            var logObj = function(obj, isError) {
                if (isError) {
                    console.error(angular.toJson(obj));
                }
                else {
                    console.log(angular.toJson(obj));
                }
            };

            function activate() {
                var query;
                if ($state.params && $state.params.query) {
                    query = $state.params.query;
                }

                omdbApi.search(query)
                    .then(function(data) {
                        $scope.specData = data;
                        // logObj(data, false);
                        $scope.listData = data.data.results[0];
                    })
                    .catch(function(e) {
                        // logObj(err, true);
                        $scope.errorMessage = 'Somthing went wrong!';
                        $exceptionHandler(e);
                    });
            }

            $scope.isShow = true;

            $scope.toggleShow = function() {
                $scope.isShow = !$scope.isShow;

                if ($scope.isShow) {
                    getInfo($state.params.query);
                }
            };

            var getInfo = function(symbol) {
                omdbApi.search(symbol)
                    .then(function(data) {
                        $scope.listData = data.data.results[0];
                    })
                    .catch(function(err) {
                        // logObj(err, true);
                        $scope.errorMessage = 'Somthing went wrong!';
                    });
            };

            activate();
        }]);

}());
