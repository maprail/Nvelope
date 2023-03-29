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
}

module.exports = EnvelopesRepositary;