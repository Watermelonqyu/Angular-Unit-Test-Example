(function() {
    'use strict';

    describe('Search Controller', function() {
        var myScope,
            ctrl,
            state,
            $this;

        beforeEach(module('companyApp'));
        beforeEach(module('ui.router'));

        beforeEach(inject(function(_$controller_, _$rootScope_, _$state_) {

            state = _$state_;
            spyOn(state, 'go');
            myScope = {};
            ctrl = _$controller_;
        }));

        it('should redirect to the query results page for non-empty query', function() {
            myScope = {query: 'IBM'};
            $this = ctrl('SearchController', {$scope: myScope}, {$state: state});
            myScope.search('From Search Controller Spec JS');
            expect(state.go).toHaveBeenCalledWith('symbols', {query: 'IBM'});
        });

        it('should not redirect to query results for empty query', function() {
            myScope = {query: ''};
            $this = ctrl('SearchController', {$scope: myScope}, {$state: state});
            myScope.search();
        });

    });

}());
