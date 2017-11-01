var app = angular.module('omdb', []);

app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://marketdata.websol.barchart.com/**',
            'https://marketdata.websol.barchart.com/**'
        ]);
    }]);

app.config(['$httpProvider',function ($httpProvider) {

        ///////TODO: REMOVE THIS AND FIX THE ROOT ISSUE
        //SOMETHING TO DO WITH CORS AND OPTIONS CALLS.
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    }]);

app.factory('omdbApi', function($http, $q) {
        var service = {};
        var baseUrl = 'https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=aeec6fede61167d3270b9cdc925f746d&';

        function httpPromise(url) {
            var deferred = $q.defer();
            $http.jsonp(url)
              .then(function success(response) {
                  deferred.resolve(response);
                  //   logObj(response, false);
              }, function error(err, status) {
                  deferred.reject(err);
                  //   logObj(err, true);
            });

            return deferred.promise;
        }

        var logObj = function(obj, isError) {
            if (isError) {
                console.error(angular.toJson(obj));
            }
            else {
                console.log(angular.toJson(obj));
            }
        };

        service.search = function(query) {
            return httpPromise(baseUrl + 'symbols=' + query);
        };

        service.find = function(query) {
            return httpPromise(baseUrl + 'symbols=' + query);
        };

        return service;
    });
