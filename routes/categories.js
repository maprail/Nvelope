// routes/categories.js

const router = require('express').Router();
module.exports = router;

const {db} = require('.././db');
const httpExecute = require('./route-handler.js')

router.get('/',  (req, res) => {
  httpExecute(req, res, db.categories.all.bind(db.categories));
});

/**
 * @swagger
 * /api/categories:
 *    post:
 *      summary: Creates envelopes form the passed in categories array
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelopes
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */

router.post('/', (req, res) => {
    httpExecute(req, res, db.categories.add.bind(db.categories));
});        

