# export-from-gridfs
Simple script to extract from Mongos GridFS

Just plug in your connection detail to the right variables: 
1. uri = 'mongodb://localhost:27018/';
2. dbName = '<db name>';
3. fsBucketName = '<bucketName>';
4. pathToSaveTo = `<local path to save to>`;


Files are saved with their db ID to make sure the file names are unique and dont get overwritten by the OS
  (e.g. ${item._id}__${item.filename})

# To Run:
1. modify your variables
2. run: 'npm install'
3. compile using tsc or by running: 'npm run build'
4. run: 'npm start'
