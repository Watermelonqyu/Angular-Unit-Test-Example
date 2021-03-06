(function() {

    'use strict';

    describe('Results Controller', function() {

        var ibmMarketData =
        {
            "status": {
                "code": 200,
                "message": "Success."
            },
            "results": [{
                "symbol": "IBM",
                "exchange": "BATS",
                "name": "International Business Machines",
                "dayCode": "N",
                "serverTimestamp": "2017-10-24T09:23:26-05:00",
                "mode": "i",
                "lastPrice": 157.41,
                "tradeTimestamp": "2017-10-24T10:08:22-05:00",
                "netChange": -2.14,
                "percentChange": -1.34,
                "unitCode": "2",
                "open": 159.65,
                "high": 159.68,
                "low": 157.14,
                "close": 0,
                "flag": "",
                "volume": 81965
            }]
        };

        var googleMarketData = {
            "status": {
                "code": 200,
                "message": "Success."
            },
            "results": [{
                "symbol": "GOOGL",
                "exchange": "BATS",
                "name": "Alphabet Class A",
                "dayCode": "N",
                "serverTimestamp": "2017-10-24T09:22:39-05:00",
                "mode": "i",
                "lastPrice": 986.8,
                "tradeTimestamp": "2017-10-24T10:07:38-05:00",
                "netChange": 1.26,
                "percentChange": 0.13,
                "unitCode": "2",
                "open": 985,
                "high": 986.84,
                "low": 977.46,
                "close": 0,
                "flag": "",
                "volume": 13660
            }]
        };

        var $controller;
        var $q;
        var $state;
        var $rootScope;
        var $scope;
        var omdbApi;
        var $exceptionHandler;

        beforeEach(module('omdb'));
        beforeEach(module('companyApp'));

        beforeEach(module(function($exceptionHandlerProvider) {
            $exceptionHandlerProvider.mode('log');
        }));

        beforeEach(angular.mock.module(function ($provide) {

            // mock the entire $state provider
            $provide.provider('$state', function () {
                return {
                    $get: function () {
                        return {
                            // by default it will be an empty object
                            params: {}
                        };
                    }
                };
            });

        }));

        beforeEach(inject(function(_$controller_, _$q_, _$state_, _$rootScope_, _omdbApi_, _$exceptionHandler_) {
            $controller = _$controller_;
            $scope = {};
            $q = _$q_;
            $state = _$state_;
            $exceptionHandler = _$exceptionHandler_;
            $rootScope = _$rootScope_;
            omdbApi = _omdbApi_;
        }));

        it('should set result status to error', function() {

            spyOn(omdbApi, 'search').and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject('Something went wrong!');
                return deferred.promise;
            });

            $controller('ResultsController', {$scope: $scope});
            $rootScope.$apply();
            expect($exceptionHandler.errors).toEqual(['Something went wrong!']);
        });

        it('should load search results', function() {
            spyOn(omdbApi, 'search').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(ibmMarketData);
                return deferred.promise;
            });

            // by getting the ResultsController, we did a fake search to get the data
            // not using jsonp
            $state.params = {query: 'IBM'};
            $controller('ResultsController', {$scope: $scope}, {omdbApi: omdbApi}, {$state: $state});
            $rootScope.$apply();
            expect($scope.specData).toEqual(ibmMarketData);
            expect(omdbApi.search).toHaveBeenCalledWith('IBM');
        });
    });

}());
