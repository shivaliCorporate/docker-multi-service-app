const { MongoClient } = require('mongodb');

const url = "mongodb://admin:password@localhost:27017"; // Use your MongoDB credentials
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    await client.close();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

testConnection();
