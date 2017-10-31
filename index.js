var express = require('express');
var thisApp = express();

thisApp.use(express.static('src'));

var server = thisApp.listen((process.env.PORT || 3211), function() {
    var port = server.address().port;

    console.log("Example thisApp listening at http://localhost: %s", port);
});
