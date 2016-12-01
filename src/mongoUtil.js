'use strict';

import mongodb from 'mongodb';
const client = mongodb.MongoClient;
let _db;

module.exports = {
  connect: function connect() {
    client.connect('mongodb://localhost:27017/local-poker-club', (err, db) => {
      if (err) {
        console.log('ERROR: ' + err);
        process.exit(1);
      }

      _db = db;
      console.log('Connected to Mongo');
    });
  },
  clubs: function clubs() {
    return _db.collection('clubs');
  }
};
