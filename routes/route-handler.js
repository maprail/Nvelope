// routes/request-handler.js

    
const httpExecute = async (req, res, handler) => {
    try {
        const data = await handler(req);
        if(req.statusCode){
            res.statusCode = req.statusCode;
        }
        
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

module.exports = httpExecute;
