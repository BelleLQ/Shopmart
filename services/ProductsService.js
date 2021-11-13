const productsModel = require('../models/ProductsModel.js');

exports.createAProduct=(req,res)=>{
    if(req.body.prodName && req.body.price && req.body.category && typeof(req.body.isBestSeller) !== "undefined" && req.body.isBestSeller !==""){
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
    else {
        res.json({
            message:"Some fields are missing or empty"
        })
    }
}

exports.readAllProducts=(req,res)=>{
    if(req.query.category){
        productsModel.find()
        .where("category").equals(req.query.category)
    .then(products=>{
        if(products){
            res.json({
                message: `A list of products that belong to the category - ${req.query.category}`,
                data: products,
                totalProducts: products.length
            })
        }
        else{
            res.json({
                message: `There is no product in the category - ${req.query.category}`,
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
    else if(typeof(req.query.isBestSeller)!="undefined"){
        productsModel.find()
        .where("isBestSeller").equals(req.query.isBestSeller)
    .then(products=>{
        if(req.query.isBestSeller){           
            if(products){
                res.json({
                    message: `A list of products that are Best Sellers`,
                    data: products,
                    totalProducts: products.length
                })
            }
            else{
                res.json({
                    message: `There is no Best Seller product`,
                    totalProducts: products.length
                })
            }
        }
        else{            
            if(products){
                res.json({
                    message: `A list of products that are not Best Sellers`,
                    data: products,
                    totalProducts: products.length
                })
            }
            else{
                res.json({
                    message: `There is no Best Seller product`,
                    totalProducts: products.length
                })
            }
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
            if(products){
                res.json({
                    message: `A list of all products`,
                    data: products,
                    totalProducts: products.length
                })
            }
            else{
                res.json({
                    message: `There is no product`,
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

// exports.readAllCategories=(req,res)=>{
//     productsModel.distinct('category.categoryName')
//     .then(categories=>{
//         if(categories){
//             res.json({
//                 message: `A list of all categories`,
//                 data: categories,
//                 totalCategories: categories.length
//             })
//         }
//         else{
//             res.json({
//                 message: `There is no categories`,
//                 totalCategories: categories.length
//             })
//         }
//     })
//     .catch(err=>{
//         res.status(500).json({
//             message: err
//         })
//     })
// }
exports.readAllCategories=(req,res)=>{
    let categoriesSetObj = [];
    productsModel.distinct('category.categoryName')
    .then(categories=>{
        const promises=categories.map((catName)=>(
            productsModel.findOne({"category.categoryName":catName})
            .then(productsObj=>{
                categoriesSetObj.push(productsObj.category);
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                })
            })
            
        ))
        Promise.all(promises)
        .then(()=>{
               if(categoriesSetObj.length>0){
                    res.json({
                        message: `A list of all categories`,
                        data: categoriesSetObj,
                        totalCategories: categoriesSetObj.length
                    })
                }
                else{
                    res.json({
                        message: `There is no categories`,
                        totalCategories: categoriesSetObj.length
                    })
                }
            })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
})
}


exports.updateAProduct=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.prodName) !== "undefined" && req.body.prodName.length==0) isValid=false;
    else if(typeof(req.body.price) !== "undefined" && req.body.price.length==0) isValid=false;
    else if(typeof(req.body.category) !== "undefined" && req.body.category.length==0) isValid=false;
    else if(typeof(req.body.isBestSeller) !== "undefined" && req.body.isBestSeller.length==0) isValid=false;

    if(isValid){
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
    else {
        res.json({
            message:"Fields cannot be empty"
        })
    }
}

exports.deleteAProduct=(req,res)=>{
    productsModel.findById(req.params.prodId)
    .then(product=>{
        if(product){
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
        else {
            res.json({
                message: `There is no product with id ${req.params.prodId}`,
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no product with id ${req.params.prodId}`
        })
    })
}