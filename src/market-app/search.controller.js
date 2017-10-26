angular.module('companyApp', [])
    .controller('SearchController', function($location) {
        this.search = function() {
            if (this.query) {
                $location.path('/getQuote.json?apikey=aeec6fede61167d3270b9cdc925f746d&').search('symbols', this.query);
            }
        };
    });
