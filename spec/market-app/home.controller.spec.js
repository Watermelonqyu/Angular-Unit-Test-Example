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
            $interval;

        beforeEach(module('companyApp'));

        beforeEach(inject(function(_$q_, _PopularCompanies_) {
            spyOn(_PopularCompanies_, 'get').and.callFake(function() {
                var deferred = _$q_.defer();
                deferred.resolve(['IBM', 'HP', 'GOOGL']);
                return deferred.promise;
            });
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
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            });
        }));

        beforeEach(inject(function(_$controller_, _$interval_, _$rootScope_, _omdbApi_, _PopularCompanies_) {
            $scope = {};
            $interval = _$interval_;
            _$controller_('HomeController', {
                $scope: $scope,
                $interval: _$interval_,
                omdbApi: _omdbApi_,
                PopularCompanies: _PopularCompanies_
            });
            _$rootScope_.$apply();
        }));

        it('should rotate movies every 5 seconds', function() {
            // Should have a default company
            // Should update after 5 seconds
            // should return to default
            console.log($scope.result);
            expect($scope.result.name).toBe(results[0].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[1].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[2].name);
            $interval.flush(5000);
            expect($scope.result.name).toBe(results[0].name);
        });
    });
}());
