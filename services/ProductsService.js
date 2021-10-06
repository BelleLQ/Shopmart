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

exports.readAProduct=(req,res)=>{
    productsModel.findById(req.params.id)
    .then(product=>{
        res.json({
            message: `The product with id ${req.params.id}`,
            data: product
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no product with id ${req.params.id}`
        })
    })
}

exports.updateAProduct=(req,res)=>{
    productsModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(product=>{
        if(product){
            res.json({
                message: `product with id ${req.params.id} is updated`,
                data: product
            })
        }
        else{
            res.status(404).json({
                message:`There is no product with id ${req.params.id}`
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
    productsModel.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({
            message: `Product with id ${req.params.id} is deleted`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}