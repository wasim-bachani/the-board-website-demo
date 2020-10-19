// database.js
(function (database) {

    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/theBoard";
    var theDb = null;
  
    database.getDb = function (next) {
      if (!theDb) {
        // connect to the database
        mongodb.MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function (err, db) {
          if (err) {
            next(err, null);
          } else {
            const myAwesomeDB = db.db('theBoardDatabase')
            theDb = {
              db: myAwesomeDB,
              notes: myAwesomeDB.collection("notes")
            };
            next(null, theDb);
          }
        });
      } else {
        next(null, theDb);
      }
    }
  
  })(module.exports);   