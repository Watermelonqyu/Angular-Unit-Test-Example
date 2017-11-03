(function() {
    'use strict';

    var companyApp = angular.module('companyApp');
    companyApp.directive('companyResult', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                result: '=result'
            },
            template: [
                '<div class="row">',
                    '<div class="col-sm-4">',
                        '<span>{{result.serverTimestamp}} ({{result.serverTimestamp | fromNow}})</span>',
                    '</div>',
                    '<div class="col-sm-8">',
                        '<h3>{{result.name}}</h3>',
                        '<p><strong>Last Price:</strong>{{result.lastPrice}}</p>',
                    '</div>',
                '</div>'
            ].join('')
        }
    });
}());
