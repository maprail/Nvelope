//This file acts as the database for the envelope server

// Setup a categories table that records the category name and percentage of total salary to be placed in the envelope
/**
 * Array of category objects stored in the database
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @typedef {Object} category Categories identify the category and percentage of total income that will be used to create objects
 * @type {{categories[]} An array of category objects
 * @param category.name {String} The name of the category e.g. 'motgage'. Used to identify a category
 * @param category.percentage {Number} Percentage of total income allocated to the category specified as a floating number betqeen 0 and 1
 */
let dbCategories = [];
/**
 * Array of envelope objects stored in the database
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @typedef {Object} envelope Categories identify the category and percentage of total income that will be used to create objects
 * @type {{envelopes[]} An array of envelope objects
 * @param envelope.name {String} The name of the envelope e.g. 'motgage'. Used to identify a category
 * @param envelope.percentage {Number} Percentage of total income allocated to the envelope specified as a floating number betqeen 0 and 1
 * @param envelope.budget {Number} Budget allocate to this envelope for each pay period
 */
let dbEnvelopes = [];
/**
 * Income received for each budget period
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @type {Number}
 */
let periodTotalIncome = 0;

// Initailize categories with test data
/**
 * Create delault array of categories for testing purposes
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @returns {{array of category objects}}
 */
const createDefaultCategories = () => {
    return [{name:'mortgage', percentage:0.3},
        {name:'utilities', percentage:0.1},
        {name:'groceries', percentage:0.2},
        {name:'entertainment', percentage:0.2},
        {name:'auto', percentage:0.1},
        {name:'savings', percentage:0.1},
    ]   
}

/**
 * Validate that all category objects in an array of categories are valid
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @param {*} categories
 * @returns {boolean}
 */
const isValidCategories = (categories) => {
    const totalSum = categories.reduce((sum, category) => sum + category.percentage, 0);
    if(totalSum === 1)
        return true;
    else
        return false;
}

/**
 * Create a single envelope for the specified category
 * @date 3/11/2023 - 12:49:01 PM
 *
 * @param {*} category
 * @returns {{ name: any; percentage: any; budget: number; }}
 */
/**
 * Description placeholder
 * @date 3/11/2023 - 12:49:46 PM
 *
 * @param {0bject} category
 * @returns {{ name: any; percentage: any; budget: number; }}
 */
const createEnvelope = (category) => {
    return {
        name: category.name,
        percentage: category.percentage,
        budget: periodTotalIncome * category.percentage,
    }
}
/** */
/**
 * Description placeholder
 * @date 3/11/2023 - 12:48:32 PM
 *
 * @returns {{}}
 */
const getAllCategories = () => {
    return dbCategories;
}

/**
 * Description placeholder
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @param {*} name
 * @returns {*}
 */
const getCategory = (name) => {
    const category = dbCategories.find(category => category.name === name);
    return category;
}

/**
 * Description placeholder
 * @date 3/11/2023 - 12:50:30 PM
 *
 * @param {*} categories
 * @returns {boolean}
 */
const createEnvelopes = (categories) => {
    if(isValidCategories(categories)){
        dbCategories = categories;
        dbEnvelopes = dbCategories.map((category) => createEnvelope(category));
        return dbEnvelopes;
    }else {
        return null;
    }
}

module.exports = {
    createEnvelopes,
    getAllCategories,
    getCategory,
}

