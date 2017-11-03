(function() {

    'use strict';

    describe('Company Result Directive', function() {
        var result = {
            "symbol": "IBM",
            "exchange": "BATS",
            "name": "International Business Machines",
            "dayCode": "N",
            "serverTimestamp": "2017-10-24T09:23:26-05:00",
            "mode": "i",
            "lastPrice": 157.41,
            "tradeTimestamp": "2017-10-24T10:08:22-05:00",
            "netChange": -2.14,
            "percentChange": -1.34,
            "unitCode": "2",
            "open": 159.65,
            "high": 159.68,
            "low": 157.14,
            "close": 0,
            "flag": "",
            "volume": 81965
        };

        var expectedHtml = [
                '<div class="col-sm-4">',
                    '<span class="ng-binding">2017-10-24T09:23:26-05:00</span>',
                '</div>',
                '<div class="col-sm-8">',
                    '<h3 class="ng-binding">International Business Machines</h3>',
                    '<p class="ng-binding"><strong>Last Price:</strong>157.41</p>',
                '</div>'
        ].join('');

        var $compile,
            $rootScope;

        beforeEach(module('companyApp'));
        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('should output company result to expected HTML format', function() {
            $rootScope.result = result;
            var element;
            element = $compile('<company-result result="result"></company-result>')($rootScope);
            $rootScope.$digest();
            expect(element.html()).toBe(expectedHtml);
        });
    });
}());
