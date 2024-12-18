let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });



// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongodb:27017";

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "user";

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  try {
    // Connect to MongoDB (using the Docker network URL)
    const client = await MongoClient.connect(mongoUrlDocker, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const db = client.db(databaseName);
    userObj['userid'] = 1;

    const myquery = { userid: 1 };
    const newvalues = { $set: userObj };

    // Perform the update operation
    await db.collection("details").updateOne(myquery, newvalues, { upsert: true });

    // Close the connection after the operation is done
    client.close();

    // Send the response after the database update is complete
    res.send(userObj);
  } catch (err) {
    // Handle any errors that occur during the process
    console.error('Error:', err);
    res.status(500).send('Error updating profile');
  }
});


app.get('/get-profile', async function (req, res) {
  console.log("Fetching profile...");
  
  try {
    // Connect to MongoDB using async/await
    const client = await MongoClient.connect(mongoUrlDocker, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB:", client.databaseName);

    let db = client.db(databaseName);
    let myquery = { userid: 1 };

    // Find the profile in the database
    const result = await db.collection("details").findOne(myquery);
    
    client.close(); // Close the connection after the operation

    // Send the result back to the client
    console.log("Fetched profile:", result);
    res.send(result ? result : {});
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(3000, function () {
  console.log("app listening on port 3000!");
});