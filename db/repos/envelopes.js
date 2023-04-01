// db/repos/envelopes,js

const cs = {};

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
        this.balance = 0.0;

        EnvelopesRepositary.#createColumnSet(pgp);
    }

    /**
     *  Get all envelopes
     */
    async all(){
        const data = await this.db.many('SELECT * FROM envelopes');

        return {
            statusCode: 200,
        }
    }

    /**
     * Distributes the amount received in accordance with the 
     * envelope percantages
     * @param {Object} req 
     */
    async allocate(req){
        const amountReceived = Number(req.body.amount);
        const envelopes = await this.db.many('SELECT * FROM envelopes');
        const updateEnvelopes = envelopes.map( e => {
            return {name: e.name, budget: e.budget + amountReceived * e.percentage};
        });
        const query = await this.pgp.helpers.update(updateEnvelopes, cs.budget) + ' WHERE v.name = t.name';
        
        await this.db.none(query);

        // Add to total budget
        this.balance += amountReceived;

        await this.db.transactions.write([{envelope_name: 'all', trans_type: 'allocate', amount: amountReceived}]);

        return {
            statusCode: 200
        }
    }

    /**
     * Reduces the budget by the amount.  Call will be rejected
     * if the balance is less than the amount being spent
     * @param {Object} req
     */
    async spend(req){
        const spendAmount = Number(req.body.amount);
        const query = 'SELECT name, percentage, budget FROM envelopes WHERE name = $1';
        const envelope = await this.db.one(query, req.params.id);
        
        if(envelope.budget < spendAmount){
            throw Error(`You have insufficient funds to spend ${spendAmount}.  Your current balance is ${envelope.budget}`);
        }

        await this.db.none('UPDATE envelopes SET budget=$1 WHERE name = $2', [envelope.budget - spendAmount, req.params.id]);

        // Subtract from total budget
        this.balance -= spendAmount;

        await this.db.transactions.write([{envelope_name: req.params.id, trans_type: 'spend', amount: spendAmount}]);

        return {
            statusCode: 200
        }
    }

     /**
     * Transfers the budget in one envelope to another
     * @param {Oject} req 
     */
     async transfer(req){
        
        const fromCat = req.params.idFrom;
        const toCat = req.params.idTo;
        const query1 = `SELECT * FROM envelopes WHERE name IN ('${fromCat}', '${toCat}')`;
        const envelopes = await this.db.many(query1);
        envelopes.find(e => e.name === toCat).budget += envelopes.find(e => e.name === fromCat).budget;
        envelopes.find(e => e.name === fromCat).budget = 0;
        const query2 = await this.pgp.helpers.update(envelopes, cs.budget) + ' WHERE v.name = t.name';

        await  this.db.none(query2);

        const transactions = envelopes.map(e => {
            return {envelope_name: e.name, trans_type: 'transfer', amount: e.budget};
        });

        await this.db.transactions.write(transactions);

        return {
            statusCode: 200,
        }
     }

    async createEnvelopes(categories) {
        const envelopes = categories.map((category) => this.#createEnvelope(category));
        const query = this.pgp.helpers.insert(envelopes, cs.get) + 'RETURNING *';
          
        return await this.db.many(query);
    }

    #createEnvelope(category) {
        return {
            name: category.name,
            percentage: category.percentage,
            budget: this.balance * category.percentage,
        }
    }

    static #createColumnSet(pgp) {
        if(Object.keys(cs).length === 0) {
            cs.get = new pgp.helpers.ColumnSet(['name', 'percentage', 'budget'], {table: 'envelopes'})
            cs.budget = new pgp.helpers.ColumnSet(['?name', 'budget'], {table: 'envelopes'})
        }
    }
}


module.exports = EnvelopesRepositary;