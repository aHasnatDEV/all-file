const express = require('express');
const multer = require('multer');
const {parse}=require('express-form-data')
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(parse());

// Define storage options for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded files will be stored
    const uploadDir = path.join(__dirname, 'uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Set the filename for uploaded files
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

// Create a multer instance with the storage options
const upload = multer({ storage });

// Handle multiple file upload form submission
app.post('/upload', (req, res) => {
  console.log(req.files.images)
  return res.status(200)
  // if (!req.files || req.files.length === 0) {
  //   return res.status(400).send('No files uploaded.');
  // }

  // // You can access the uploaded files' information via req.files array
  // const uploadedFiles = req.files.map((file) => ({
  //   originalname: file.originalname,
  //   filename: file.filename,
  //   size: file.size,
  // }));

  // // You can process the uploaded files here or store them as needed.
  // // For now, we'll just send a success response with file details.
  // res.send(uploadedFiles);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🏹`);
});
