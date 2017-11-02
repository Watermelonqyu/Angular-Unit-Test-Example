(function() {

    'use strict';

    var companyApp = angular.module('companyApp');

    companyApp
        .controller('ResultsController', ['$scope', 'omdbApi', '$state', function($scope, omdbApi, $state) {

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
                    .catch(function(err) {
                        // logObj(err, true);
                        $scope.errorMessage = 'Somthing went wrong!';
                    });
            }

            activate();
        }]);

}());
