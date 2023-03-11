const apiRouter = require('express').Router();
module.exports = apiRouter;

// Add routers for api modules
const envelopesRouter = require('./envelopes');



// Assign routes to each router
apiRouter.use('/envelopes', envelopesRouter);
