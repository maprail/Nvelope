//This file acts as the database for the envelope server

// Setup a categories table that records the category name and percentage of total salary to be placed in the envelope
let dbCategories = [];
let dbEnvelopes = [];
let periodTotalBudget = 0;

// Initailize categories with test data
const createDefaultCategories = () => {
    return [{name:'mortgage', percentage:0.3},
        {name:'utilities', percentage:0.1},
        {name:'groceries', percentage:0.2},
        {name:'entertainment', percentage:0.2},
        {name:'auto', percentage:0.1},
        {name:'savings', percentage:0.1},
    ]   
}

const isValidCategories = (categories) => {
    const totalSum = categories.reduce((sum, category) => sum + category.percentage, 0);
    if(totalSum === 1)
        return true;
    else
        return false;
}

const createEnvelope = (category) => {
    return {
        name: category.name,
        percentage: category.percentage,
        budget: periodTotalBudget * category.percentage,
    }
}

const getAllCategories = () => {
    return dbCategories;
}

const getCategory = (name) => {
    const category = dbCategories.find(category => category.name === name);
    return category;
}

const createEnvelopes = (categories) => {
    if(isValidCategories(categories)){
        dbCategories = categories;
        dbEnvelopes = dbCategories.map((category) => createEnvelope(category));
        return true;
    }else {
        return false;
    }
}

module.exports = {
    createEnvelopes,
    getAllCategories,
    getCategory,
}

