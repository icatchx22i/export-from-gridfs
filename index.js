"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var fs_1 = require("fs");
var uri = 'mongodb://localhost:27018/';
var dbName = '<db name>';
var fsBucketName = '<bucketName>';
var pathToSaveTo = "<local path to save to>";
var count = 0;
mongodb_1.MongoClient.connect(uri).then(function (client) {
    var db = client.db(dbName);
    var bucket = new mongodb_1.GridFSBucket(db, {
        bucketName: fsBucketName
    });
    bucket.find({ 'metadata.isDeleted': false })
        .on('data', function (item) {
        count++;
        bucket.openDownloadStream(item._id).pipe(fs_1.createWriteStream(pathToSaveTo + "/" + item._id + "__" + item.filename));
    })
        .on('end', function () { return console.log(count); })
        .on('error', function (err) { return console.log(err); });
});
