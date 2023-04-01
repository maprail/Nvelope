// /db/ropos/repository

class Repository {
    constructor(db, pgp){
        this.db = db;
        this.pgp = pgp;
    }

    async execute(req, res, handler) {
        try {
            const data = handler(req);

            res.status(data.statusCode);
            res.json({
                success: true,
                data: data.data
            });
        }
        catch(err) {
            res.json({
                success: false,
                error: err.message || err
            });
        }
    }
}

module.exports = Repository;