// db/repos/envelopes,js

class EnvelopesRepositary {
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
     *  Get all envelopes
     */
    all(){

    }

    /**
     * Distributes the amount received in accordance with the 
     * envelope percantages
     * @param {Object} req 
     */
    allocate(req){

    }

    /**
     * Reduces the budget by the amount.  Call will be rejected
     * if the balance is less than the amount being spent
     * @param {Object} req
     */
    spend(req){

    }

    async createEnvelopes(categories) {

    }
}

/*const createColumnSets = (pgp) => {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'envelopes', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        cs.update = cs.insert.extend(['?percentage', '?budget']);
    }
    return cs; 
} */


module.exports = EnvelopesRepositary;