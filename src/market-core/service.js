angular.module('CompanyCore', ['ngResource'])
    .factory('PopularCompanies', function($resource) {
        var token = 'teddybear'; // TBC
        return $resource('popular/:companyId', {companyId: '@id'}, {
            update: {
                method: 'PUT',
                headers: {'authToken': token}
            },

            get: {
                method: 'GET',
                headers: {'authToken': token}
            },

            query: {
                method: 'GET',
                headers: {'authToken': token}
            },

            save: {
                method: 'POST',
                headers: {'authToken': token}
            },

            remove: {
                method: 'DELETE',
                headers: {'authToken': token}
            }
        });
    });
