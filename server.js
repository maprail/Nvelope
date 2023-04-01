const express = require('express');
const app = express();
module.exports = app;

// Setup browser on localhost - browser should be in a folder named browser
// if not replace 'browser' with the path to the index.html of your browser
app.use(express.static('browser'));

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const docsRouter = require("./routes/docs");
app.use("/api-docs", docsRouter);

// Mount the api router below 
const apiRouter = require('./routes/api.js');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}