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
            // dump(angular.mock.dump(data));
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
        $httpBackend.expectGET('https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=aeec6fede61167d3270b9cdc925f746d&symbols=GGGGLLLL')
            .respond(200);

        PopularCompanies.get({ companyId: 'GGGGLLLL'});

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular company', function() {
        $httpBackend.expectPUT('https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=aeec6fede61167d3270b9cdc925f746d&symbols=')
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
            return headers['Content-Type'] === 'application/json';
        };

        var matchAny = 'https://marketdata.websol.barchart.com/getQuote.jsonp?apikey=aeec6fede61167d3270b9cdc925f746d&symbols=';
        var nothing = '';

        var popularCompany = new PopularCompanies({
            companyId: 'GGGGLLLL',
            description: 'Another Great Company!'
        });

        $httpBackend.whenGET(matchAny)
            .respond(200);

        $httpBackend.expectPOST(matchAny)
            .respond(200);

        $httpBackend.expectPUT(matchAny)
            .respond(200);

        $httpBackend.expectDELETE(matchAny)
            .respond(200);

        popularCompany.$save();
        popularCompany.$update();
        popularCompany.$remove();

        expect($httpBackend.flush).not.toThrow();
    });
});
