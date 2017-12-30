var frisby = require('frisby');

var root = "http://localhost/hamstersbooks";

frisby.create('get all read books')
    .get(root+'/api/book/all/READ')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .toss();