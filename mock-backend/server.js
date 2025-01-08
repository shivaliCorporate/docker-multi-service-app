let express = require('express');
let path = require('path');
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
let mongoUrlDocker = "mongodb://admin:password@mongodb:27017";

// MongoDB options and database name
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let databaseName = "user";

// Add a new user
app.post('/add-user', async function (req, res) {
  let userObj = req.body;

  try {
    const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);
    const db = client.db(databaseName);

    // Fetch the highest userid in the collection
    const lastUser = await db.collection("details").find().sort({ userid: -1 }).limit(1).toArray();
    const nextId = lastUser.length > 0 ? lastUser[0].userid + 1 : 1;

    userObj.userid = nextId; // Assign the next userid

    const result = await db.collection("details").insertOne(userObj);

    client.close();
    res.status(201).send({ message: "User added successfully", userId: result.insertedId });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user");
  }
});

// Update an existing user
app.post('/edit-user', async function (req, res) {
  let { userid, ...updatedData } = req.body;

  try {
    const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);
    const db = client.db(databaseName);

    const myquery = { userid: parseInt(userid) };
    const newvalues = { $set: updatedData };

    const result = await db.collection("details").updateOne(myquery, newvalues);

    client.close();

    if (result.matchedCount === 0) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.send({ message: "User updated successfully" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});

// Get all users
app.get('/get-users', async function (req, res) {
  try {
    const client = await MongoClient.connect(mongoUrlDocker, mongoClientOptions);
    const db = client.db(databaseName);

    const users = await db.collection("details").find({}).toArray();

    client.close();
    res.send(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});