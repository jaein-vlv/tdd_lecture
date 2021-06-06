const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json')

let firstProduct;
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

it("GET /api/product", async() => {
  const response = await request(app).get("/api/product");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
})

it("GET /api/product/:productId", async() => {
  const response = await request(app).get('/api/product/'+ firstProduct._id)
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
})

it("GET id doesnt exist /api/product/:productId", async() => {
  const response = await request(app).get('/api/product/60bb9b5aa758db41403d8210');
  expect(response.statusCode).toBe(404);
})

it("PUT /api/product", async () => {
  const response = await request(app).put('/api/product/' + firstProduct._id)
    .send({name: "updated name", description: "updated description"})
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("updated name")
  expect(response.body.description).toBe("updated description")
})

it("should return 404 on PUT /api/product", async() => {
  const response = await request(app).put('/api/product', + "60bb9b5aa758db41403d8210")
    .send({name: "updated name", description: "updated description"})
  expect(response.statusCode).toBe(404)
})

it("DELETE /api/product/:productId", async() => {
  const response = await request(app)
    .delete('/api/product/' + firstProduct._id)
    .send();
  expect(response.statusCode).toBe(200);
})

it("DELETE id doesnt exist /api/product/:productId", async() => {
  const response = await request(app)
    .delete('/api/product/' + firstProduct._id)
    .send();
  expect(response.statusCode).toBe(404);
})