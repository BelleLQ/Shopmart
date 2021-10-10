const customerModel = require('../models/customersModel');

exports.createACustomer=(req,res)=>{
    const customer = new customerModel(req.body);
    customer.save()
    .then(newCustomer=>{
        res.json({
            message:"The customer is created",
            data: newCustomer
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}

exports.readAllCustomers=(req,res)=>{
    customerModel.find()
    .then(customers=>{
        res.json({
            message: 'A list of all customers',
            data: customers,
            totalCustomers: customers.length
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}

exports.readACustomer=(req,res)=>{
    customerModel.findById(req.params.custId)
    .then(customer=>{
        res.json({
            message: `The customer with id ${req.params.custId}`,
            data: customer
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no customer with id ${req.params.custId}`
        })
    })
}

exports.updateACustomer=(req,res)=>{
    customerModel.findByIdAndUpdate(req.params.custId, req.body, {new: true})
    .then(customer=>{
        if(customer){
            res.json({
                message: `Customer with id ${req.params.custId} is updated`,
                data: customer
            })
        }
        else{
            res.status(404).json({
                message:`There is no customer with id ${req.params.custId}`
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}

exports.deleteACustomer=(req,res)=>{
    customerModel.findByIdAndRemove(req.params.custId)
    .then(()=>{
        res.json({
            message:`The customer with id ${req.params.custId} is deleted`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}