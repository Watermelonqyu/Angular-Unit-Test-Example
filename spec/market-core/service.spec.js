describe('CompanyCore', function() {
    var PopularCompanies;
    var $httpBackend;

    beforeEach(module('CompanyCore'));

    beforeEach(inject(function(_PopularCompanies_, _$httpBackend_) {
        PopularCompanies = _PopularCompanies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular company', function() {
        var expectedData = function(data) {
            dump(angular.mock.dump(data));
            return true;
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var popularCompany = new PopularCompanies({
            companyId: 'GGGGLLLL',
            description: 'Great Company!'
        });

        popularCompany.$save();
        expect($httpBackend.flush).not.toThrow();
    });

    it('should get popular comany by id', function() {
        $httpBackend.expectGET('popular/GGGGLLLL')
            .respond(200);

        PopularCompanies.get({ companyId: 'GGGGLLLL'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular company', function() {
        $httpBackend.expectPUT('popular')
            .respond(200);
        var popularCompany = new PopularCompanies({
            companyId: 'GGGGLLLL',
            description: 'Another Great Company!'
        });

        popularCompany.$update();
        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', function() {
        // '{"authToken": "teddybear", "Accept": "application/json, text/plain, */*"}'
        // var expectedHeaders = function(headers) {
        //     return angular.fromJson(headers).authToken === 'teddybear';
        // };
        // expectedHeaders can be either a function or the exact same object as headers
        // var expectedHeaders = {"authToken": "teddybear", "Accept": "application/json, text/plain, */*"};
        //
        // $httpBackend.expectGET('popular/GGGGLLLL', expectedHeaders)
        //     .respond(200);
        // PopularCompanies.get({companyId: 'GGGGLLLL'});
        // $httpBackend.flush(1);


        var headerData = function(headers) {
            return headers.authToken === 'teddybear';
        };

        var matchAny = /.*/;

        $httpBackend.whenGET(matchAny, headerData)
            .respond(200);

        $httpBackend.expectPOST(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectPUT(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectDELETE(matchAny, headerData)
            .respond(200);

        var popularCompany = { id: 'QQQQWWWW', description: 'The company is great!'};

        PopularCompanies.query();
        PopularCompanies.get({id: 'QQQQWWWWW'});

        new PopularCompanies(popularCompany).$save();
        new PopularCompanies(popularCompany).$update();
        new PopularCompanies(popularCompany).$remove();

        expect($httpBackend.flush).not.toThrow();
    });
});
