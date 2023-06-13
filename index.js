const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
// const mongodbUri = "mongodb://admin:admin@35.188.100.25:27017/mydatabase?authSource=admin" || "mongodb://localhost:27017/mydatabase";
const pEnv = process.env;
const mongodbUri = (pEnv.MONGO_USER && pEnv.MONGO_HOST) ? 
        `mongodb://${pEnv.MONGO_USER}:${pEnv.MONGO_PASS}@${pEnv.MONGO_HOST}:${pEnv.MONGO_PORT}/${pEnv.MONGO_DB}?authSource=admin` :
        "mongodb://localhost:27017/mydatabase";
console.log(mongodbUri);
mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connected to MongoDB ${mongodbUri}`);
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
    console.log(req);
    const collectionName = req.body.collectionName;
    const collection = mongoose.connection.db.collection(collectionName);
    console.log(`Using collection: ${collectionName}`);

    res.status(200).json({ message: `Using collection: ${collectionName}` });
});

// Insert documents
app.post('/api/insert', (req, res) => {
    const collectionName = req.body.collectionName;
    const documents = req.body.documents;

    const collection = mongoose.connection.db.collection(collectionName);
    collection.insertMany(documents)
        .then(() => {
            res.status(200).json({ message: 'Documents inserted' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error inserting documents' });
        });
});

// Fetch records
app.get('/api/fetch/:collectionName', (req, res) => {
    const collectionName = req.params.collectionName;

    const collection = mongoose.connection.db.collection(collectionName);
    collection.find().toArray()
        .then((documents) => {
            res.status(200).json(documents);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error fetching documents' });
        });
});

app.get('/', (req, res) => {
    res.send(`Sample microservice app that will create a collection and provide facility to insert and fetch records. ${port}`);
});

// Define your routes and middleware here

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
