companyApp
    .controller('SearchController', ['$scope', '$location', '$state', '$timeout', function($scope, $location, $state, $timeout) {
        var timeout;

        $scope.keyup = function() {
            timeout = $timeout($scope.search(), 1000);
        };

        $scope.keydown = function() {
            $timeout.cancel(timeout);
        }

        $scope.search = function(msg) {
            $timeout.cancel(timeout);
            if ($scope.query) {
                $state.go('symbols', {query: $scope.query});
            }
        };
    }]);
