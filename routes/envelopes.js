// routes/envelopes.js

const router = require('express').Router();
module.exports = router;

const {db} = require('.././db');
const httpExecute = require('./route-handler.js')

/**
 * 
 * 
 * @swagger
 * /api/envelopes:
 * get:
 *   summary: Get all envelopes
 *   description: Get all active envelopes
 *   responses:
 *   "200":
 *     description: Success
 *     content:
 *     application/json:
 *   "400":
 *     content:
 *     text/plain; charset=utf-8:
 *       examples:
 *       Error:
 *         value: Invalid Argument
 *     description: Invalid Argument Provided
 *   tags:
 *     - Envelopes
 */
router.get('/', (req, res) => {
    httpExecute(req, res, db.envelopes.all.bind(db.envelopes));
});


router.put('/', (req, res) => {
    httpExecute(req, res, db.envelopes.allocate.bind(db.envelopes));
});


router.put('/:id', (req, res) => {
    httpExecute(req, res, db.envelopes.spend.bind(db.envelopes));
});


router.put('/:idFrom/:idTo', (req, res) => {
    httpExecute(req, res, db.envelopes.transfer.bind(db.envelopes));
});

