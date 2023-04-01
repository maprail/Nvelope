const expect = require('chai').expect;
const { application } = require('express');
const request = require('supertest');
//const { response } = require('../server');

const app = require('../server.js');

const initCategories = [
  {
      name: "mortgage",
      percentage: 0.3
  },
  {
      "name": "utilities",
      "percentage": 0.1
  },
  {
      "name": "groceries",
      "percentage": 0.2
  },
  {
      "name": "entertainment",
      "percentage": 0.2
  },
  {
      "name": "auto",
      "percentage": 0.1
  },
  {
      "name": "savings",
      "percentage": 0.1
  }
]

const rejectCategories = [
  {
      "name": "mortgage",
      "percentage": 0.2
  },
  {
      "name": "utilities",
      "percentage": 0.1
  },
  {
      "name": "healthCare",
      "percentage": 0.1
  },
  {
      "name": "groceries",
      "percentage": 0.2
  },
  {
      "name": "entertainment",
      "percentage": 0.1
  },
  {
      "name": "auto",
      "percentage": 0.1
  },
  {
      "name": "savings",
      "percentage": 0.1
  }
];

describe('GET /api/categories', () => {
  it('should return an array of all categories', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        const categories = response.body.data;
        categories.forEach((category) => {
          expect(category).to.have.ownProperty('name');
          expect(category).to.have.ownProperty('percentage');
      });
    });
  });

  it('should verify categories are an array', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        expect(response.body.data).to.be.an.instanceOf(Array);
    });
  });
});

describe('POST /api/categories', () => {
  it('should create envelopes from provided category array', () => {
    return request(app)
      .post('/api/categories')
      .send(initCategories)
      .expect(200)
      .then((response) => response.body.data)
      .then((envelopes) => {
        expect(envelopes.length === initCategories.length);
        const envCategories = envelopes.map(envelope => {
          return {name: envelope.name, 
                  percentage: envelope.percentage};
      });
        expect(envCategories).to.be.deep.equal(initCategories);
      });
  });

  it('should fail to create envlopes. sum percent of each category is != 100%', () => {
    return request(app)
      .post('/api/categories')
      .send(rejectCategories)
      .expect(400)
  });
});



