const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.get('/api/records', async (req, res) => {
  try {
    // Establish a connection to the MongoDB database
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('mydatabase');

    // Fetch records from the MongoDB collection/table
    const collection = db.collection('mycollection');
    const records = await collection.find().toArray();

    // Close the database connection
    client.close();

    // Return the fetched records as the API response
    res.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Microservice listening at http://localhost:${port}`);
});
