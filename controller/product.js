const Product = require('../models/product');
const productModel = require('../models/product')
exports.createProduct = async (req, res, next) => {
  try{
    const createProduct = await productModel.create(req.body);
    res.status(201).json(createProduct);
  } catch (error) {
    next(error);
  }
  
};

exports.getProducts = async(req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts)
  } catch(error) {
    next(error)
  }
  
}

exports.getProductById = async(req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId);
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).send();
    }
  } catch(error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    // new:true => 업데이트 된 값 리턴
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId, 
      req.body, 
      { new:true}
    );
    if(updatedProduct) {
      res.status(200).json(updatedProduct)
    } else {
      res.status(404).send();
    }
  } catch(error) {
    next(error)
  }
  

}