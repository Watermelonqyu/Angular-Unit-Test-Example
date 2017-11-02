(function() {
    'use strict';

    var companyApp = angular.module('companyApp', [
        'ui.bootstrap',
        'ui.router',                  //state based routing, ngRoute extended
        'omdb',
        'CompanyCore']);

    companyApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'market-app/home.html',
                controller: 'HomeController'
            })
            .state('symbols', {
                url: '/symbols',
                templateUrl: 'market-app/results.html',
                controller: 'ResultsController',
                params: {
                    query: ''
                }
            });

        $locationProvider.html5Mode({
            enable: true,
            requireBase: false
        });
    }]);

}());
