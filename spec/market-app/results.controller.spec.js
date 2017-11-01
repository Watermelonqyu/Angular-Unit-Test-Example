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
    var $state;
    var $rootScope;
    var $scope;
    var omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('companyApp'));

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

    beforeEach(inject(function(_$controller_, _$q_, _$state_, _$rootScope_, _omdbApi_) {
        $controller = _$controller_;
        $scope = {};
        $q = _$q_;
        $state = _$state_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
    }));
    
    it('should set result status to error', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $controller('ResultsController', {$scope: $scope});
        $rootScope.$apply();
        expect($scope.errorMessage).toBe('Somthing went wrong!');
    });

    it('should load search results', function() {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $state.params = {query: 'IBM'};
        $controller('ResultsController', {$scope: $scope}, {omdbApi: omdbApi}, {$state: $state});
        dump('**********************************************************   ' +  angular.mock.dump($scope.listData));
        expect($scope.listData).toBeUndefined();
        $rootScope.$apply();
        expect($scope.listData).toBeUndefined();
        expect(omdbApi.search).toHaveBeenCalledWith('IBM');
    });
});
