// controlers/categories

/**
 * 
 * @desc    Retrieve the array of current categories
 * @route   GET /api/categories 
 */
exports.getCategories = async (req, res) => {
    res.send();
}

/**
 * 
 * @desc    Create envelopes from the provided categories array
 * @route   POST /api/categories 
 * @note    Sum of all percentages in the categories array must add up to 100%
 */
exports.createEnvelopes = async (req, res) => {
    res.send();
}

/**
 * 
 * @desc    Transfer budgets between envelopes based on the percentages in the passed array vs the existing envelopes
 * @route   PUT /api/categories 
 * @note    Sum of passed categories array percentages must be the same as the existing categories to be modified
 */
exports.transferBudgets = async (req, res) => {
    res.send();   
}