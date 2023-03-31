// db/repos/categories.js

// Helper functions
const {
    isValidCategories,
    createEnvelope
} = require('../../server/util.js');

const cs = {};

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

        CategoriesRepositary.#createColumnSet(pgp);
    }

    /**
     *  Get all categories
     */
    all(){
        return this.db.any('SELECT * FROM categories');
    }

    
    /**
     * Adds categories and creates new envelopes.
     * Distributes total funds in exiting envelopes per the
     * required distribution in the new categories
     * @param {Oject} req 
     */
    async add(req) {
        console.log("hello world");
        console.log(req.body);
 //       req.statusCode = 201;
        const categories = req.body;
        if(isValidCategories(categories)){
            // Update category table
            this.db.none('TRUNCATE TABLE categories CASCADE');
            const query = this.pgp.helpers.insert(categories, cs.get);
            console.log(query);
          
            await this.db.none(query);


        }
        else {
            const err = new Error('Incorrect category array: Verify sum of all category percentages is 100%');
            throw(err);
        }
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

    static #createColumnSet(pgp) {
        if(Object.keys(cs).length === 0) {
            cs.get = new pgp.helpers.ColumnSet(['name', 'percentage'], {table: 'categories'})
        }
    }

    
}

/*
const createColumnSets = (pgp) => {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'categories', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        cs.update = cs.insert.extend(['?percentage']);
    }
    return cs;    
}*/

module.exports = CategoriesRepositary;
