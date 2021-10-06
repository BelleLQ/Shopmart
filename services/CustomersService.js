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
    customerModel.findById(req.params.id)
    .then(customer=>{
        res.json({
            message: `The customer with id ${req.params.id}`,
            data: customer
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no customer with id ${req.params.id}`
        })
    })
}

exports.updateACustomer=(req,res)=>{
    customerModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(customer=>{
        if(customer){
            res.json({
                message: `Customer with id ${req.params.id} is updated`,
                data: customer
            })
        }
        else{
            res.status(404).json({
                message:`There is no customer with id ${req.params.id}`
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
    customerModel.findByIdAndRemove(req.params.id)
    .then(()=>{
        res.json({
            message:`The customer with id ${req.params.id} is deleted`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}