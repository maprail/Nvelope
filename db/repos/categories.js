// db/repos/categories.js

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
    async all(){
        const data = await this.db.any('SELECT * FROM categories');
        return {
            statusCode: 200
        }
    }

    
    /**
     * Adds categories and creates new envelopes.
     * Distributes total funds in exiting envelopes per the
     * required distribution in the new categories
     * @param {Oject} req 
     */
    async add(req) {
        const categories = req.body;
        if(this.#isValidPercentages(categories)){
            // Update category table
            await this.db.none('TRUNCATE TABLE categories CASCADE');
            const query = this.pgp.helpers.insert(categories, cs.get);
          
            await this.db.none(query);

            const data = await this.db.envelopes.createEnvelopes(categories);
            return {
                statusCode: 201
            }
        }
        else {
            const err = new Error('Incorrect category array: Verify sum of all category percentages is 100%');
            throw(err);
        }
    }

    #isValidPercentages(categories){
        const totalSum = categories.reduce((sum, category) => sum + category.percentage * 100, 0)/100;
        if(totalSum === 1){
            return true;
        }    
        else {
            return false;
        }
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
