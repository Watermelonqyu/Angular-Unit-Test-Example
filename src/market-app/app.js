(function() {
    'use strict';

    var companyApp = angular.module('companyApp', [
        'ui.bootstrap',
        'ui.router',
        'ngMockE2E',                //state based routing, ngRoute extended
        'omdb',
        'CompanyCore']);

    companyApp.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    companyApp.config(function($logProvider) {
        $logProvider.debugEnabled(true);
    });

    companyApp.run(function ($httpBackend) {
        var data = ['HP', 'GOOGL', 'IBM'];

        var headers = {
            headers: {'Content-Type': 'application/json'}
        };

        //return the Popular Movie Ids
        $httpBackend.whenGET(function(s) {
            console.log(s.indexOf('symbols') !== -1);
            return (s.indexOf('symbols') !== -1);
        }).respond(200, data, headers);

        // allow all other requests to return
        // $httpBackend.whenGET(true).passThrough();
    });


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
