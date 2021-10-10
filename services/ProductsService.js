const productsModel = require('../models/ProductsModel');

exports.createAProduct=(req,res)=>{
    const product = new productsModel(req.body);
    product.save()
    .then(newProduct=>{
        res.json({
            message: `A new product is created`,
            data: newProduct
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:err
        })
    })
}

exports.readAllProducts=(req,res)=>{
    if(req.query.category){
        productsModel.find()
        .where("category").equals(req.query.category)
    .then(products=>{
        res.json({
            message: `A list of products that belong to the category - ${req.query.category}`,
            data: products,
            totalProducts: products.length
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
    }
    else if(typeof(req.query.isBestSeller)!="undefined"){
        productsModel.find()
        .where("isBestSeller").equals(req.query.isBestSeller)
    .then(products=>{
        if(req.query.isBestSeller){
            res.json({
                message: `A list of products that are Best Sellers`,
                data: products,
                totalProducts: products.length
            })
        }
        else{
            res.json({
                message: `A list of products that are not Best Sellers`,
                data: products,
                totalProducts: products.length
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
    }
    else{
        productsModel.find()
        .then(products=>{
            res.json({
                message: `A list of all products`,
                data: products
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }
}

exports.readAProduct=(req,res)=>{
    productsModel.findById(req.params.prodId)
    .then(product=>{
        res.json({
            message: `The product with id ${req.params.prodId}`,
            data: product
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no product with id ${req.params.prodId}`
        })
    })
}

exports.readAllCategories=(req,res)=>{
    productsModel.distinct('category')
    .then(categories=>{
        res.json({
            message: `A list of all categories`,
            data: categories
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}

exports.updateAProduct=(req,res)=>{
    productsModel.findByIdAndUpdate(req.params.prodId, req.body, {new: true})
    .then(product=>{
        if(product){
            res.json({
                message: `product with id ${req.params.prodId} is updated`,
                data: product
            })
        }
        else{
            res.status(404).json({
                message:`There is no product with id ${req.params.prodId}`
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}

exports.deleteAProduct=(req,res)=>{
    productsModel.findByIdAndRemove(req.params.prodId)
    .then(()=>{
        res.json({
            message: `Product with id ${req.params.prodId} is deleted`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}