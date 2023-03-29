// routes/envelopes.js

const router = require('express').Router();
module.exports = router;

const {db} = require('.././db');
const {RouteHandler} = require('./route-handler.js');

const eRouter = new RouteHandler(router);

/**
 * @swagger
 * /api/envelopes:
 *     get:
 *       summary: Get all envelopes
 *       description: >-
 *         This operation retrieves a list of all active envelopes and there attributes 
 *         in the envelopes table of the database
 *      operationId: get_envelopes
 *       responses:
 *         '200':
 *            description: Success
 *            content:
 *              application/json:
 *                examples:
 *                  Get Envelopes:
 *                    value: >-
 *                      [{"name": "mortgage","percentage": 0.3,"budget": 0},{"name":
 *                      "utilities","percentage": 0.1,"budget": 0},{"name":
 *                      "goceries","percentage": 0.2,"budget": 0},{"name":
 *                      "entertainment","percentage": 0.2,"budget": 0},{"name":
 *                      "auto""percentage": 0.1,"budget": 0},{"name":
 *                      "savings","percentage": 0.1,"budget": 0}]
 *         '400':
 *           content:
 *             text/plain; charset=utf-8:
 *               examples:
 *                 Error:
 *                   value: Invalid Argument
 *           description: Invalid Argument Provided
 *       tags:
 *         - Envelopes
 */
eRouter.get('/', db.envelopes.all);

/**
 * @swagger
 * /api/envelopes:
 *     put:
 *       summary: Receive Income
 *       description: >-
 *         This operation distributes the income received amongst the envelopes in accordance with the percentage
 *         of income assigned to each envelope
 *      operationId: put_income
 *      requestBody:
 *          description: Amount of income received
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: string
 *                      example: '1000'
 *      responses:
 *         '200':
 *            description: Success
 *            content:
 *              text/plain; charset=utf-8:
 *                examples:
 *                  Meesage:
 *                    value: Success
 *         '400':
 *           description: Invalid Argument Provided
 *           content:
 *             text/plain; charset=utf-8:
 *               examples:
 *                 Error:
 *                   value: Invalid Argument
 *       tags:
 *         - Receive Income
 */
eRouter.put('/', db.envelopes.allocate);

/**
 * @swagger
 * /api/envelopes{id}:
 *     put:
 *       summary: Spend from envelope
 *       description: >-
 *         This operation deducts an amount spent from the envelope budget
 *      operationId: put_income
 *      parameters:
 *           - name: id
 *           in: path
 *           description: The category decribing the envelope.
 *           required: true
 *           schema:
 *              type: string
 *              example: auto
 *      requestBody:
 *          description: Amount being spent
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: string
 *                      example: '20.99'
 *      responses:
 *         '200':
 *            description: Success
 *            content:
 *              text/plain; charset=utf-8:
 *                examples:
 *                  Meesage:
 *                    value: Success
 *         '400':
 *           description: Insufficient funds
 *           content:
 *             text/plain; charset=utf-8:
 *               examples:
 *                 Error:
 *                   value: Insufficient funds
 *       tags:
 *         - Use budget
 */
eRouter.put('/:id', db.envelopes.spend);


/**
 * @swagger
 * components:
 *   schemas:
 *     category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The envelope's category.
 *           example: auto
 *         percentage:
 *           type: float
 *           description: Percentage of total amount received allocated to this envelope
 *           example: 0.10
 *     envelope:
 *       allOf:
 *         - type: object
 *           properties:
 *             amount:
 *              type: float
 *              example: 100.10 
 *         - $ref: '#/components/schemas/category'
 */