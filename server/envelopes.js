const envelopesRouter = require('express').Router();
module.exports = envelopesRouter;

const {
    createEnvelopes,
    getAllCategories,
    getCategory,
    getAllEnvelopes,
    getEnvelope,
    addIncome,
    spendIncome,
    transferBudgets
}

 = require('./db');

envelopesRouter.param('categoryId', (req, res, next, id) => {
    req.category = getCategory(id);
    if(!req.category){
        res.status(404).send();
    }
    next();
});

envelopesRouter.param('envelopeId', (req, res, next, id) => {
    req.envelope = getEnvelope(id);
    if(!req.envelope){
        res.status(404).send();
    }
    next();
});

envelopesRouter.post('/categories', (req, res, next) => {
    const categories = req.body.categories;
    const envelopes = createEnvelopes(categories);

    if(envelopes){
        res.status(201).json(envelopes);
    } else {
        res.status(400).json('Total of all category percentages must add up to 100%');
    }
});

envelopesRouter.get('/categories', (req, res, next) => {
    const categories = getAllCategories();
    if(categories != []){
        res.status(200).json(categories);
    } else {
        res.status(400).json('There are no categories assigned');
    }
});

envelopesRouter.get('/categories/:categoryId', (req, res, next) => {
    res.status(200).send(req.category);
});

envelopesRouter.put('/categories', (req, res, next) => {
    const categories = req.body.categories;
    const updatedCategories = transferBudgets(categories);

    if(updatedCategories){
        res.status(200).send(updatedCategories);
    } else {
        res.status(400).json('Invalid categories found!')
    }
});

envelopesRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllEnvelopes());
});

envelopesRouter.get('/:envelopeID', (req, res, next) => {
    res.status(200).send(req.envelope);
})

envelopesRouter.put('/', (req, res, next) => {
    const income = Number(req.body.income);
    const updatedEnvelopes = addIncome(income);
    if(updatedEnvelopes) {
        res.status(200).send(updatedEnvelopes);
    } else {
        res.status(400).json('No envelopes found');
    }
});

envelopesRouter.put('/:envelopeId', (req, res, next) => {
    const updatedEnvelope = spendIncome(req.envelope, Number(req.body.spending));
    if(updatedEnvelope) {
        res.status(200).send(updatedEnvelope);
    } else {
        res.status(400).json(`Requested amount of ${req.body.spending} > ${req.envelope.budget}!`);
    }
});