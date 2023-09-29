// Import required Node.js modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const md5 = require("md5");
const fs2 = require("fs").promises;

// Define the port to listen on (default is 3000)
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Configure middleware for handling raw binary data and setting limits for uploads
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '100mb' }));

// Enable CORS to allow requests from 'http://localhost:5173' (update with your specific client origin)
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define a route to handle file uploads in chunks
app.post('/upload', (req, res) => {
  // Extract query parameters from the request
  const { name, currentChunkIndex, totalChunks } = req.query;

  // Determine if it's the first and last chunk of the file
  const firstChunk = parseInt(currentChunkIndex) === 0;
  const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;

  // Extract file extension and binary data from the request body
  const ext = name.split('.').pop();
  const data = req.body.toString().split(',')[1];
  const buffer = new Buffer.from(data, 'base64');

  // Generate a temporary filename based on the file name and client IP
  const tmpFilename = 'tmp_' + md5(name + req.ip) + '.' + ext;

  // If it's the first chunk and the temporary file exists, delete it
  if (firstChunk && fs.existsSync('./uploads/' + tmpFilename)) {
    fs.unlinkSync('./uploads/' + tmpFilename);
  }

  // Append the chunk's data to the temporary file
  fs.appendFileSync('./uploads/' + tmpFilename, buffer);

  // If it's the last chunk, rename the temporary file to a final filename
  if (lastChunk) {
    const finalFilename = md5(Date.now()).substr(0, 6) + '.' + ext;
    fs.renameSync('./uploads/' + tmpFilename, './uploads/' + finalFilename);
    res.json({ finalFilename });
  } else {
    // Respond with 'ok' for intermediate chunks
    res.json('ok');
  }
});

// Define a route to handle file deletions
app.delete('/remove/:id', (req, res) => {
  // Extract the filename to be deleted from the route parameters
  const file = './uploads/' + req.params.id;

  // Delete the specified file
  fs2.unlink(file)
    .then(() => {
      // Respond with a JSON message indicating successful deletion
      res.json({ message: 'deleted' });
    })
    .catch(error => {
      // Handle errors, e.g., file not found
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🏹`);
});
