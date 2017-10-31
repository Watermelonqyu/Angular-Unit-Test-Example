companyApp
    .controller('SearchController', function($scope, $location) {

        console.log('Search Controller is connected');
        $scope.search = function() {
            if ($scope.query) {
                console.log($scope.query);
                $location.path('/getQuote.json?apikey=aeec6fede61167d3270b9cdc925f746d&').search('symbols', $scope.query);
            }
        };
    });
