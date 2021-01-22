import { MongoClient, GridFSBucket } from "mongodb";
import { createWriteStream } from "fs";

const uri = 'mongodb://localhost:27018/';
const dbName = '<db name>'
const fsBucketName = '<bucketName>'
const pathToSaveTo = `<local path to save to>`;

let count = 0;

MongoClient.connect(uri).then((client) => {
    const db = client.db(dbName);
    var bucket = new GridFSBucket(db, {
        bucketName: fsBucketName
    })
    bucket.find({ 'metadata.isDeleted': false })
        .on('data', (item) => {
            count++;
            bucket.openDownloadStream(item._id).pipe(createWriteStream(`${pathToSaveTo}/${item._id}__${item.filename}`))
        })
        .on('end', () => console.log(`Found and processed ${count} files`))
        .on('error', (err) => console.log(err))
}); 