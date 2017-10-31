companyApp
    .controller('SearchController', ['$scope', '$location', '$state', function($scope, $location, $state) {

        console.log('Search Controller is connected');
        $scope.search = function() {
            if ($scope.query) {
                // console.log($scope.query);
                $state.go('symbols', {query: $scope.query});
            }
        };
    }]);
