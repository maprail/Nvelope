// routes/categories.js

const router = require('express').Router();
module.exports = router;

/**
 * @swagger
 * /api/categories:
 *     get:
 *       summary: Get all categgories
 *       description: >-
 *         This operation retrieves a list of all active categories and there attributes 
 *         in the category table of the database
 *      operationId: get_envelopes
 *       responses:
 *         '200':
 *            description: Success
 *            content:
 *              application/json:
 *                examples:
 *                  GET categories:
 *                    value: >-
 *                      [{"name": "mortgage","percentage": 0.3},{"name":
 *                      "utilities","percentage": 0.1},{"name":
 *                      "goceries","percentage": 0.2},{"name":
 *                      "entertainment","percentage": 0.2},{"name":
 *                      "auto""percentage": 0.1},{"name":
 *                      "savings","percentage": 0.1}]
 *         '400':
 *           content:
 *             text/plain; charset=utf-8:
 *               examples:
 *                 Error:
 *                   value: Invalid Argument
 *           description: Invalid Argument Provided
 *       tags:
 *         - Categories
 */
router.get('/', (req, res) => {
    res.status(400).send();
});

 /**
  * /api/categories:
    post:
      summary: Create required envelopes from categories
      description: >-
        This operation takes an array of categories and create the envelopes. The
        sum of all percentages must add to 100%
      operationId: create_envelopes
      requestBody:
        description: array of objects
        content:
          application/json:
            schema: 
              $ref: '#/components/schemas/Categories'
        required: true      
      responses:
        '201':
          description: Created
          content:
            text/plain; charset=utf-8:
              examples:
                Create Envelopes:
                  value: Created
        '400':
          description: Request Failed
          content:
            text/plain; charset=utf-8:
              examples:
                Request Failed:
                  value: Total of all category percentages must add up to 100%
      tags:
        - Create Envelopes
  * 
  */
router.post('/', (req, res) => {
    res.status(400).send();
});

/**
  * /api/categories:
    put:
      summary: Modify budget percentages assgned to envelopes
      description: >-
        This operation reasigns category percentages to the provided categories array.e
        The rearanged sum of all percentages must add up to the sum of percentages in the current categories being modified
      operationId: update_percantages
      requestBody:
        description: array of objects
        content:
          application/json:
            schema: 
              $ref: '#/components/schemas/Categories'
        required: true      
      responses:
        '200':
          description: Success
          content:
            text/plain; charset=utf-8:
              examples:
                Create Envelopes:
                  value: Created
        '400':
          description: Request Failed
          content:
            text/plain; charset=utf-8:
              examples:
                Request Failed:
                  value: Invalid categories array.  Are sum of percentages of passed array equal to sum of percentages of existing categories.
      tags:
        - Modify Percentages
  * 
  */
router.put('/', (req, res) => {
    res.status(400).send();
});

/**
 * @swagger
  components:
  schemas:
    Categories:
      type: object
      properties:
        categories:
          type: array
          items:
            type: object
            properties:
              category:
                type: string
              percentage: 
                type: number
      example:
        categories:
          - category: auto
            percentage: 0.40
          - category: savings
            percentage: 0.60

 */