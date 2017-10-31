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
                  //console.log('decrement: ' + postEvent);
                  deferred.resolve(response);
                  //console.log('resolved promise: ' + postEvent);
              }, function error(err, status) {
                  //console.log('decrement: ' + postEvent);
                  deferred.reject(err);
                  //console.log('resolved promise error: ' + postEvent);
            });
            // $http({
            //     method: 'GET',
            //     url: url,
            //     headers: {
            //          'Accept': 'application/json',
            //          'Content-Type': 'application/json',
            //          'Access-Control-Allow-Credentials': true,
            //          'Access-Control-Allow-Origin': '*',
            //          'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
            //          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            //     }
            // }).then(function success(response) {
            //     deferred.resolve(response);
            // }, function error(err) {
            //     deferred.reject(err);
            // });
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
