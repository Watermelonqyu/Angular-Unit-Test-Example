companyApp
    .controller('ResultsController', ['$scope', '$location', 'omdbApi', '$state', function($scope, $location, omdbApi, $state) {

        function activate() {
            var query;
            if ($state.params && $state.params.query) {
                query = $state.params.query;
            }

            // console.log($state.params.query + ' ResultsController is connected');
            omdbApi.search(query)
                .then(function(data) {
                    $scope.listData = data.data.results[0];
                    // console.log(data.data.results[0]);
                })
                .catch(function() {
                    $scope.errorMessage = "Somthing went wrong!";
                });
        }

        activate();
    }]);
