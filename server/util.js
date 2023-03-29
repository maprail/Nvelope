// server/util.js

/**
 * Validate that all category objects in an array of categories are valid
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @param {array} categories
 * @returns {boolean}
 */
const isValidCategories = (categories) => {
    const totalSum = sumPercentages(categories);
    if(totalSum === 1)
        return true;
    else
        return false;
}

/**
 * 
 * @param {array} categories 
 * @returns {number}
 */
const sumPercentages = (categories) => {
    return categories.reduce((sum, category) => sum + category.percentage * 100, 0)/100;
}

/**
 * 
 * @param {array} envelopes 
 * @returns {number}
 */
const sumBugets = (envelopes) => {
    return envelopes.reduce((sum, env) => sum + env.budget, 0);
}

const createEnvelope = (category) => {
    return {
        name: category.name,
        percentage: category.percentage,
        budget: periodIncome * category.percentage,
    }
}

module.exports = {
    isValidCategories,
    createEnvelope
}