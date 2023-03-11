const envelopesRouter = require('express').Router();
module.exports = envelopesRouter;

const {
    createEnvelopes,
    getAllCategories,
    getCategory,
} = require('./db');

envelopesRouter.param('category', (req, res, next, category) => {
    req.category = getCategory(category);
    if(!req.category){
        res.status(404).send();
    }
    next();
});

envelopesRouter.post('/categories', (req, res, next) => {
    const categories = req.body.categories;
    if(createEnvelopes(categories)){
        res.status(201).json(req.body);
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

envelopesRouter.get('/categories/:category', (req, res, next) => {
    res.send(req.category);
});