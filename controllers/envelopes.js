// controllers/envelopes

/**
 * 
 * @desc        Retrievs array of all active envelopes   
 * @route       GET /api/envelopes
 * @note
 */
exports.getEnvelopes = async (res, req) {
    res.send
}

/**
 * 
 * @desc        Distributes income received between envelopes   
 * @route       POST /api/envelopes
 * @note
 */
exports.receiveIncome = async (res, req) {
    res.send();
}

/**
 * 
 * @desc        Reduces budget by amount spent   
 * @route       GET /api/envelopes/:id
 * @note        Does not allow negative budgets
 */
exports.spendBudget = async (res, req) {
    res.send();
}