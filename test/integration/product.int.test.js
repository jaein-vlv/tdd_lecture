const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json')

it("POST /api/product", async() => {
  const response = await request(app)
    .post("/api/product")
    .send(newProduct)
  
  expect(response.statusCode).toBe(201)
  expect(response.body.name).toBe(newProduct.name)
  expect(response.body.description).toBe(newProduct.description)
})

it("should return 500 on POST /api/product", async () => {
  const response = await request(app)
    .post('/api/product')
    .send({name:"test"})
  
  expect(response.statusCode).toBe(500)
  expect(response.body).toStrictEqual({message: "Product validation failed: description: Path `description` is required."})
})