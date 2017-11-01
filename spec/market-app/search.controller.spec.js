(function() {
    'use strict';

    describe('Search Controller', function() {
        var myScope,
            ctrl,
            state,
            $this,
            $timeout;

        beforeEach(module('companyApp'));
        beforeEach(module('ui.router'));

        beforeEach(inject(function(_$controller_, _$rootScope_, _$state_, _$timeout_) {
            $timeout = _$timeout_;
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

        it('should redirect afrer 1 second of keyboard inactivity', function() {
            myScope = {query: 'DEL'};
            $this = ctrl('SearchController', {$scope: myScope}, {$state: state}, {$timeout: $timeout});
            myScope.keyup();
            // calling flush caused the $timeout to happen
            // to control all the timeout function, we can add time in flush as param
            // eg. $timeout.flush(500)
            // check if there is any pending task
            // $timeout.verifyNoPendingTasks()
            $timeout.flush();
            expect($timeout.verifyNoPendingTasks).not.toThrow();
            expect(state.go).toHaveBeenCalledWith('symbols', {query: 'DEL'});
        });

        it('should cancel timeout in keydown', function() {
            myScope = {query: 'I'};
            $this = ctrl('SearchController', {$scope: myScope}, {$state: state}, {$timeout: $timeout});
            myScope.keyup();
            myScope.keydown();
            expect($timeout.verifyNoPendingTasks).not.toThrow();
        });

        it('should cancel timeout on search', function() {
            myScope = {query: 'HP'};
            $this = ctrl('SearchController', {$scope: myScope}, {$state: state}, {$timeout: $timeout});
            myScope.keyup();
            myScope.search();
            expect($timeout.verifyNoPendingTasks).not.toThrow();
        });
    });

}());
