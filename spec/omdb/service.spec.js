describe('omdb service', function() {
    var ibmMarketData =
    {
        "status": {
            "code": 200,
            "message": "Success."
        },
        "results": [{
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
        }]
    };

    var googleMarketData = {
        "status": {
            "code": 200,
            "message": "Success."
        },
        "results": [{
            "symbol": "GOOGL",
            "exchange": "BATS",
            "name": "Alphabet Class A",
            "dayCode": "N",
            "serverTimestamp": "2017-10-24T09:22:39-05:00",
            "mode": "i",
            "lastPrice": 986.8,
            "tradeTimestamp": "2017-10-24T10:07:38-05:00",
            "netChange": 1.26,
            "percentChange": 0.13,
            "unitCode": "2",
            "open": 985,
            "high": 986.84,
            "low": 977.46,
            "close": 0,
            "flag": "",
            "volume": 13660
        }]
    };

    var omdbApi = {};
    var $httpBackend;
    beforeEach(module('omdb'));

    beforeEach(inject(function(_omdbApi_, _$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return market data for ibm', function() {
        var response;

        var expectedUrl = function(url) {
            return url.indexOf('http://marketdata.websol.barchart.com/') !== -1;
        }

        // when get from the url, return hard coded data obj
        $httpBackend.whenGET(expectedUrl).respond(200, ibmMarketData);
        $httpBackend.expectGET(expectedUrl).respond(200, ibmMarketData);
        omdbApi.search('IBM')
            .then(function(data) {
                response = data;
            });
        $httpBackend.flush();
        expect(response.status).toEqual(ibmMarketData.status.code);
    });

    it('should handle error', function() {
        var response;

        var expectedUrl = function(url) {
            return url.indexOf('http://marketdata.websol.barchart.com/') !== -1;
        }

        // when get from the url, return hard coded data obj
        $httpBackend.whenGET(expectedUrl).respond(500);
        $httpBackend.expectGET(expectedUrl).respond(500);
        omdbApi.find('GOOGL')
            .then(function(data) {
                response = data;
            })
            .catch(function(data) {
                response = 'Error!';
            });
        $httpBackend.flush();
        expect(response).toEqual('Error!');
    });

    it('should return market data for google', function() {
        var response;

        var expectedUrl = function(url) {
            return url.indexOf('http://marketdata.websol.barchart.com/') !== -1;
        }

        // when get from the url, return hard coded data obj
        $httpBackend.whenGET(expectedUrl).respond(200, ibmMarketData);
        $httpBackend.expectGET(expectedUrl).respond(200, ibmMarketData);
        omdbApi.find('GOOGL')
            .then(function(data) {
                response = data;
            });
        $httpBackend.flush();
        expect(response.status).toEqual(ibmMarketData.status.code);
    });
});
