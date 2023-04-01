//db/repos/transactions.js

const Repository = require("./repository");

const cs = {}

class TransactionsRepository extends Repository {
    constructor(db, pgp){
        super(db, pgp);

        TransactionsRepository.#createColumnSet(pgp)
    }

    all(){

    }

    getByCategory(req){

    }

    getById(req){

    }

    async write(transactions){
        try {
            const query = await this.pgp.helpers.insert(transactions, cs.get);
            await this.db.none(query);
        }
        catch(err){
            console.log(`Transaction write error: ${err.message}`);
        } 
    }

    static #createColumnSet(pgp) {
        if(Object.keys(cs).length === 0) {
            cs.get = new pgp.helpers.ColumnSet(['envelope_name', 'trans_type', 'amount'], {table: 'transactions'})
        }
    }    

}

module.exports = TransactionsRepository;