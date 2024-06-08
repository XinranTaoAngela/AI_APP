const express = require('express');
const multer = require('multer');
const cors = require('cors');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors()); // Enables CORS for all origins, consider configuring for your specific URL

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        console.log('Received file:', req.file.filename);

        // Here you would typically pass the file path to a machine learning model
        const imagePath = req.file.path;

        // Simulating a response from a machine learning operation
        // Replace this with actual machine learning logic
        const detectedObjects = "Sample object"; // Placeholder value

        res.json({ description: `Detected objects: ${detectedObjects}` });
    } else {
        res.status(400).send('No file uploaded.');
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
