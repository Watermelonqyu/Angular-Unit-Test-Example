companyApp
    .controller('ResultsController', function($scope, $location, omdbApi) {
        var query = $location.search().q;
        console.log('ResultsController is connected');
        omdbApi.search(query)
            .then(function(data) {
                $scope.results = data.Search;
            })
            .catch(function() {
                $scope.errorMessage = "Somthing went wrong!";
            });
    });
