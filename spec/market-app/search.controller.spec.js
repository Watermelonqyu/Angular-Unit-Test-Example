describe('Search Controller', function() {
    var $scope;
    var $location;
    var $controller;

    beforeEach(module('companyApp'));

    beforeEach(inject(function(_$controller_, _$location_) {
        $location = _$location_;
        $controller = _$controller_;
        $scope = {};
        // var fn = function($scope) {
        //     $scope.search = function() {
        //         if ($scope.query) {
        //             $location.path('/getQuote.json?apikey=aeec6fede61167d3270b9cdc925f746d&').search('symbols', $scope.query);
        //         }
        //     };
        // };
        //
        // _$controller_(fn, {$scope: $scope});
    }));

    it('should redirect to the query results page for non-empty query', function() {
        $this = $controller('SearchController', {$scope: $scope}, {$location: $location}, {query: 'IBM'});
        $this.search();
        expect($location.url()).toBe('/getQuote.json%3Fapikey=aeec6fede61167d3270b9cdc925f746d&?symbols=IBM');
    });

    it('should not redirect to query results for empty query', function() {
        $this = $controller('SearchController', {$scope: $scope}, {$location: $location}, {query: ''});
        $this.search();
        expect($location.url()).toBe('');
    });

});
