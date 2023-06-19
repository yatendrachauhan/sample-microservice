const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
const pEnv = process.env;
const mongodbUri = (pEnv.MONGO_USER && pEnv.MONGO_HOST) ?
    `mongodb://${pEnv.MONGO_USER}:${pEnv.MONGO_PASS}@${pEnv.MONGO_HOST}:${pEnv.MONGO_PORT}/${pEnv.MONGO_DB}?authSource=admin` :
    "mongodb://localhost:27017/mydatabase";
mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Create an Express app
const app = express();

// Middleware for parsing JSON in request body
app.use(express.json());

// Create a collection (if not already created)
app.post('/api/collection', (req, res) => {
    const collectionName = req.body.collectionName;
    if (mongoose.connection && mongoose.connection.db.collection) {
        const collection = mongoose.connection.db.collection(collectionName);
        console.log(`Using collection: ${collectionName}`);

        res.status(200).json({ message: `Using collection: ${collectionName}` });
    } else {
        res.status(500).json({ error: 'DB connection not available' });
    }
});

// Insert documents
app.post('/api/insert', (req, res) => {
    const collectionName = req.body.collectionName;
    const documents = req.body.documents;

    if (mongoose.connection && mongoose.connection.db.collection) {
        const collection = mongoose.connection.db.collection(collectionName);
        collection.insertMany(documents)
            .then(() => {
                res.status(200).json({ message: 'Documents inserted' });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error inserting documents' });
            });
    } else {
        res.status(500).json({ error: 'DB connection not available' });
    }
});

// Fetch records
app.get('/api/fetch/:collectionName', (req, res) => {
    const collectionName = req.params.collectionName;

    if (mongoose.connection && mongoose.connection.db.collection) {
        const collection = mongoose.connection.db.collection(collectionName);
        collection.find().toArray()
            .then((documents) => {
                res.status(200).json(documents);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Error fetching documents' });
            });
    } else {
        res.status(500).json({ error: 'DB connection not available' });
    }
});

app.get('/', (req, res) => {
    res.send(`Sample microservice app that will create a collection and provide facility to insert and fetch records.
                Use following urls: <br />
                1) /api/collection - for creating new collection if not exist. Need to pass collection name in this form {"collectionName": <collection_name>} <br />
                2) /api/insert - for inserting records. Need to pass collection name and records in this form {"collectionName":<collection_name>,"documents":[<records_list>]} <br />
                3) /api/fetch/:collectionName - for getting the records. Need to replace collectionName with your collection name.`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
