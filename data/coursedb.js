var sampleData = require('./sampleCourses');
var docDb = require('documentdb');
var async = require('async');

var config = {
    host: 'https://rjnodedb.documents.azure.com:443/',
    auth: {
        masterKey: 'bJ6I3XnnGspPIoHFmeeGH2ATtqzMFxeSM91KARszZB7XfZWGzXKkoDaTehvgMbefgUPpJcEf2TQXpZ13945DsQ=='
    }
};

var client = new docDb.DocumentClient(config.host, config.auth);
var coursesLink =  docDb.UriFactory.createDocumentCollectionUri("rjnode", "courses");

var createCourses = function(callback) {
    var documents = [];
    async.forEachOf(sampleData, (course, key, next) => {
        client.createDocument(coursesLink, course, (err, document) => {
            if(err) return next(err);
            documents.push(document);
            next();
        });
    }, err => callback(err, documents));
};

var queryCourses = function(callback) {

    var querySpec = {
        query: "SELECT * FROM c",
        parameters: []
    };
    
    client.queryDocuments(coursesLink, querySpec).toArray((err, results) => {
        callback(err, results);
    });
};

module.exports = {
    createCourses: createCourses,
    queryCourses: queryCourses
};