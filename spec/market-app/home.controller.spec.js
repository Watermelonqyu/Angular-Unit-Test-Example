(function() {

    'use strict';

    describe('Home Controller', function() {
        var results = [
            {
                'symbol': 'IBM',
                'name': 'International Business Machines'
            },
            {
                'symbol': 'HP',
                'name': 'Helmerich \u0026 Payne'
            },
            {
                'symbol': 'GOOGL',
                'name': 'Alphabet Class A'
            }
        ];

        var $scope,
            $interval,
            $q,
            $controller,
            $rootScope,
            omdbApi,
            PopularCompanies,
            $exceptionHandler,
            $log;

        beforeEach(module('companyApp'));

        beforeEach(module(function($exceptionHandlerProvider) {
            $exceptionHandlerProvider.mode('log');
        }));

        beforeEach(module(function($logProvider) {
            $logProvider.debugEnabled(true);
        }));

        beforeEach(inject(function(_$q_, _omdbApi_) {
            spyOn(_omdbApi_, 'search').and.callFake(function() {
                var deferred = _$q_.defer();
                var args = _omdbApi_.search.calls.mostRecent().args[0];
                if (args === 'IBM') {
                    deferred.resolve(results[0]);
                } else if (args === 'HP') {
                    deferred.resolve(results[1]);
                } else if (args === 'GOOGL') {
                    deferred.resolve(results[2]);
                } else if (args === 'ttError') {
                    deferred.reject('error finding company');
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            });
        }));

        beforeEach(inject(function(_$controller_, _$interval_, _$q_, _$log_, _$exceptionHandler_, _$rootScope_, _omdbApi_, _PopularCompanies_) {
            $scope = {};
            $interval = _$interval_;
            $q = _$q_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $exceptionHandler = _$exceptionHandler_;
            omdbApi = _omdbApi_;
            PopularCompanies = _PopularCompanies_;
            $log = _$log_;
        }));

        it('should rotate movies every 5 seconds', function() {
            // Should have a default company
            // Should update after 5 seconds
            // should return to default

            spyOn(PopularCompanies, 'get').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(['IBM', 'HP', 'GOOGL']);
                return deferred.promise;
            });

            $controller('HomeController', {
                $scope: $scope,
                $interval: $interval,
                omdbApi: omdbApi,
                PopularCompanies: PopularCompanies
            });

            $rootScope.$apply();

            expect($scope.result.name).toBe(results[0].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[1].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[2].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[0].name);

            console.log(angular.mock.dump($log.log.logs));
            expect($log.log.logs[0][0]).toBe('standard log');
            console.log(angular.mock.dump($log.info.logs));
            console.log(angular.mock.dump($log.error.logs));
            console.log(angular.mock.dump($log.warn.logs));
            console.log(angular.mock.dump($log.debug.logs));
        });

        it('should handle error', function() {

            spyOn(PopularCompanies, 'get').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(['IBM', 'HP', 'GOOGL', 'ttError']);
                return deferred.promise;
            });

            $controller('HomeController', {
                $scope: $scope,
                $interval: $interval,
                omdbApi: omdbApi,
                PopularCompanies: PopularCompanies
            });

            expect($scope.result.name).toBe(results[0].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[1].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[2].name);
            $interval.flush(5000);
            expect($exceptionHandler.errors).toEqual(['error finding company']);
        });
    });
}());
