(function() {

    'use strict';

    var companyApp = angular.module('companyApp');

    companyApp
        .controller('HomeController', ['$scope', '$interval', 'omdbApi', 'PopularCompanies', function($scope, $interval, omdbApi, PopularCompanies) {
            var results = [];
            var index = 0;

            var findCompany = function(symbol) {
                omdbApi.find(symbol)
                    .then(function(data) {
                        $scope.result = data;
                    });
            };

            // Get popular companies list
            // PopularCompanies.get()
            //     .then(function(data) {
            var data = ['IBM', 'HP', 'GOOGL'];
            results = data;
            findCompany(results[0]);
            $interval(function() {
                ++index;
                findCompany(results[index % results.length]);
            }, 5000);
                // })
                // .catch(function(err) {
                //     console.log(err);
                // });
        }]);
}());
