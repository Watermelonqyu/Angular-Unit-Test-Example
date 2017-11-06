angular.module('CompanyCore', ['ngResource'])
    .factory('PopularCompanies', function($resource) {
        var token = 'teddybear'; // TBC
        return $resource('https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=aeec6fede61167d3270b9cdc925f746d&symbols=:companyId', {companyId: '@id'}, {
            update: {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'}
            },

            get: {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            },

            query: {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            },

            save: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            },

            remove: {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }
        });
    });
