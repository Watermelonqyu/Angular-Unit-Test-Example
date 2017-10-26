var app = angular.module('omdb', []);

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://marketdata.websol.barchart.com/**',
            'https://marketdata.websol.barchart.com/**',
            'http://angularjs.org/**'
        ]);
    }]);

app.factory('omdbApi', function($http, $q) {
        var service = {};
        var baseUrl = 'http://marketdata.websol.barchart.com/getQuote.json?apikey=aeec6fede61167d3270b9cdc925f746d&';

        function httpPromise(url) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Credentials': true
                }
            }).then(function success(response) {
                deferred.resolve(response);
            }, function error(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        service.search = function(query) {
            return httpPromise(baseUrl + 'symbols=' + query);
        };

        service.find = function(query) {
            return httpPromise(baseUrl + 'symbols=' + query);
        };

        return service;
    });
