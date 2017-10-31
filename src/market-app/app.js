var companyApp = angular.module('companyApp', ['ui.bootstrap', 'ui.router', 'omdb']);

companyApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('symbols', {
            url: '/symbols',
            templateUrl: 'market-app/results.html',
            controller: 'ResultsController'
        });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);
