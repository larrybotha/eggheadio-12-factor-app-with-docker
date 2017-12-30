const dotenv = require('dotenv');
const {MongoClient} = require('mongodb');

// running dotenv.config() will automatically inject env vars found in .env into
// the app if the file exists
dotenv.config();

// before
// MongoClient.connect('mongodb://localhost:27017/foo', (err, cb) => {

// after
// access environment vars via process.env
// environment variable now obtained either directly from cli on running process,
// or by reading from a .env
MongoClient.connect(process.env.MONGO_URI, (err, cb) => {
  if (err) {
    console.log('Cannot connect to mongodb', err);
  } else {
    console.log('connected to mongodb');
  }
});
