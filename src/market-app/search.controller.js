companyApp
    .controller('SearchController', ['$scope', '$location', '$state', function($scope, $location, $state) {
        $scope.search = function(msg) {
            if ($scope.query) {
                $state.go('symbols', {query: $scope.query});
            }
        };
    }]);
