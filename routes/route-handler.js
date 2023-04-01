// routes/request-handler.js

    
const httpExecute = async (req, res, handler) => {
    try {
        const data = await handler(req);

        res.status(data.statusCode);
        
        res.json({
            success: true,
            data: data.data
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message || error
        });
    }   
} 

module.exports = httpExecute;
