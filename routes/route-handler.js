// routes/request-handler.js

class RouteHandler {
    #router;

    constructor(router) {
        this.#router = router;
    }

    get() {
        return this.#router;
    }

    set(router) {
        this.#router = router; 
    }

    get(url, handler){
        this.#router.get(url, (req, res) => this.#execute(req, res, handler));
    }

    post(url, handler){
        this.#router.post(url, (req, res) => this.#execute(req, res, handler));
    }

    put(url, handler){
        this.#router.post(url, (req, res) => this.#execute(req, res, handler));
    }

    async #execute(req, res, handler) {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    }   
}

module.exports = {RouteHandler};
