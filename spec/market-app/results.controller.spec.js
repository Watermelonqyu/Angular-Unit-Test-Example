describe('Results Controller', function() {

    var results =  {
        "Search": [
            {
                "symbol": "HP",
                "exchange": "BATS",
                "name": "Helmerich \u0026 Payne",
                "dayCode": "P",
                "serverTimestamp": "2017-10-26T10:30:42-05:00",
                "mode": "i"
            },
            {
                "symbol":"IBM",
                "exchange":"BATS",
                "name":"International Business Machines",
                "dayCode":"P",
                "serverTimestamp":"2017-10-26T10:33:30-05:00",
                "mode":"i"
            },
            {
                "symbol":"DEL",
                "exchange":"BATS",
                "name":"Deltic Timber Corp",
                "dayCode":"P",
                "serverTimestamp":"2017-10-26T10:35:15-05:00",
                "mode":"i"
            }
        ]
    };

    var $controller;
    var $q;
    var $location;
    var $rootScope;
    var $scope;
    var omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('companyApp'));

    beforeEach(inject(function(_$controller_, _$q_, _$location_, _$rootScope_, _omdbApi_) {
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'IBM');
        $controller('ResultsController', {$scope: $scope});
        $rootScope.$apply();
        expect($scope.results[0].symbol).toBe(results.Search[0].symbol);
        expect($scope.results[1].symbol).toBe(results.Search[1].symbol);
        expect($scope.results[2].symbol).toBe(results.Search[2].symbol);

        expect(omdbApi.search).toHaveBeenCalledWith('IBM');
    });

    it('should set result status to error', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'IBM');
        $controller('ResultsController', {$scope: $scope});
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Somthing went wrong!');
    });
});
