// index.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS (for connecting with frontend later)
app.use(cors({ origin: "http://localhost:3000" }));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route: Upload and parse PDF
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);
    const extractedText = data.text;

    // Delete the file after extraction
    fs.unlinkSync(filePath);

    res.json({ success: true, text: extractedText });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: 'Failed to process PDF' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });