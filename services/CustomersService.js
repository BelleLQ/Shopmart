const customerModel = require('../models/CustomersModel');

exports.createACustomer=(req,res)=>{
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password ) {
        customerModel.findOne()
        .where("email").equals(req.body.email)
        .sort({'firstName':1})
        .then(repeatedCustomers=>{
            console.log(repeatedCustomers);
                if(!repeatedCustomers){
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
                                message: `Error: ${err}`
                            })
                        })
                }
                else {
                    res.json({
                        message:"Failed. The email has been registered"
                    })
                }

                })
            }
    else {
        res.json({
            message:"Some fields are missing"
        })
    }
}

exports.readAllCustomers=(req,res)=>{
    customerModel.find()
        .sort({'firstName':1})
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
        if(customer){
            res.json({
                message: `The customer with id ${req.params.custId}`,
                data: customer
            })
        }
        else {
            res.json({
                message: `There is no customer with id ${req.params.custId}`,
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            message: `${err}`
        })
    })
}

exports.updateACustomer=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.firstName) !== "undefined" && req.body.firstName.length===0) isValid=false;
    else if(typeof(req.body.lastName) !== "undefined" && req.body.lastName.length===0) isValid=false;
    else if(typeof(req.body.email) !== "undefined" && req.body.email.length===0) isValid=false;
    else if(typeof(req.body.password) !== "undefined" && req.body.email.password===0) isValid=false;

    if(isValid){
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
    else {
        res.json({
            message:"Some fields are missing"
        })
    }  
}

exports.deleteACustomer=(req,res)=>{
    customerModel.findById(req.params.custId)
    .then(customer=>{
        if(customer){
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
        else {
            res.json({
                message: `There is no customer with id ${req.params.custId}`,
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            message: `${err}`
        })
    })
    
}