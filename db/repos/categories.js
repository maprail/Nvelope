// db/repos/categories.js

// Helper functions
const {
    isValidCategories,
    createEnvelope
} = require('../../server/util.js');

class CategoriesRepositary {
    /**
     * constructor
     * @param {*} db - pg-promise database object
     * @param {*} pgp - pg-promise object
     */
    constructor(db, pgp)
    {
        this.db = db;
        this.pgp = pgp;
    }

    /**
     *  Get all categories
     */
    all(){

    }

    
    /**
     * Adds categories and creates new envelopes.
     * Distributes total funds in exiting envelopes per the
     * required distribution in the new categories
     * @param {Oject} req 
     */
    async add(req) {

    }

    /**
     * Aportions budgets in accordance with the specified
     * percentages in the categories array. Category names must
     * match existing category names in the envelopes array. 
     * Sum of all category percentages must match the sum of 
     * the equivalent envelopes categories in the active envelopes
     * @param {Oject} req 
     */
    transfer(req){

    }
}

module.exports = CategoriesRepositary;
