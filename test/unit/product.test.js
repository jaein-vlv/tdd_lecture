const { it, expect, beforeEach } = require('@jest/globals');
const productController = require('../../controller/product');
const productModel = require('../../models/product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json')
productModel.create = jest.fn(); // mock 함수(spy역할)

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  })
  test("should have a createProduct function", () => {
    // 함수가 있는지 작성
    expect(typeof productController.createProduct).toBe("function");
  });
  // 데이터 가져오기
  it("should call productModel.create", () => {
    productController.createProduct(req, res, next);
    // 위에 호출될때 아래함수가 호출이 되는지?
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should retrun 201 response code", () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    // send 데이터를 보내줬는지
    expect(res._isEndCalled()).toBeTruthy(); 
  });

  it("should return json body in response", () => {
    productModel.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct)
  })
});