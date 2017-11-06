(function() {

    'use strict';

    var companyApp = angular.module('companyApp');

    companyApp
        .controller('HomeController', ['$scope', '$interval', '$exceptionHandler', 'omdbApi', 'PopularCompanies', '$log',  function($scope, $interval, $exceptionHandler, omdbApi, PopularCompanies, $log) {
            var results = [];
            var index = 0;

            $log.log('standard log');
            $log.info('info log');
            $log.error('error log');
            $log.warn('warn.log');
            $log.debug('some debug information');

            var findCompany = function(symbol) {
                omdbApi.search(symbol)
                    .then(function(data) {
                        $scope.result = data;
                    })
                    .catch(function(e) {
                        $exceptionHandler(e);
                    });
            };

            // Get popular companies list
            PopularCompanies.get()
                .then(function(data) {
                // var data = ['IBM', 'HP', 'GOOGL'];
                results = data;
                findCompany(results[0]);
                $interval(function() {
                    ++index;
                    findCompany(results[index % results.length]);
                }, 5000);
            });
            // .catch(function(err) {
            //     console.log(err);
            // });
        }]);
}());
