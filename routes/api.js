const apiRouter = require('express').Router();
module.exports = apiRouter;

// Add routers for api modules
const envelopesRouter = require('./envelopes.js');
const categoriesRouter = require('./categories.js');
//const (envelopesRouter, categoriesRouter) = require('.././routes')



// Assign routes to each router
apiRouter.use('/envelopes', envelopesRouter);
apiRouter.use('/categories', categoriesRouter);
