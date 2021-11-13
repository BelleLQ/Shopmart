const herosModel = require('../models/HerosModel');

exports.createAHero=(req,res)=>{
    if(req.body.heroName && req.body.photoUrl && req.body.startDate && req.body.endDate){
        const hero = new herosModel({
            heroName : req.body.heroName,
            photoUrl : req.body.photoUrl,
            description: req.body.description,
            startDate : new Date(req.body.startDate),
            endDate : new Date(req.body.startDate)
        });
        hero.save()
        .then(newHero=>{
            res.json({
                message: `A new hero is created`,
                data: newHero
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

exports.readAllHeros=(req,res)=>{
    const todayDate = new Date().toISOString();
    herosModel.find({
        'startDate':{$lte:todayDate},
        "endDate":{$gte: todayDate}
        })
    .then(heros=>{
        if(heros.length){
            res.json({
                message: `A list of all hero items that are now on sale`,
                data: heros,
                totalHeros: heros.length
            })
        }
        else{
            res.json({
                message: `There is no hero`,
                totalHeros: heros.length
            })
        }
        
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
    
}

exports.readHerosHistory=(req,res)=>{
    herosModel.find()
    .then(heros=>{
        if(heros){
            res.json({
                message: `A list of all hero items in hero history`,
                data: heros,
                totalHeros: heros.length
            })
        }
        else{
            res.json({
                message: `There is no hero in hero history`,
                totalHeros: heros.length
            })
        }
        
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
    
}

exports.readAHero=(req,res)=>{
    herosModel.findById(req.params.heroId)
    .then(hero=>{
        res.json({
            message: `The hero with id ${req.params.heroId}`,
            data: hero
        })
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no hero with id ${req.params.heroId}`
        })
    })
}

exports.updateAHero=(req,res)=>{
    let isValid = true;
    if(typeof(req.body.heroName) !== "undefined" && req.body.heroName.length==0) isValid=false;
    else if(typeof(req.body.photoUrl) !== "undefined" && req.body.photoUrl.length==0) isValid=false;
    else if(typeof(req.body.startDate) !== "undefined" && req.body.startDate.length==0) isValid=false;
    else if(typeof(req.body.endDate) !== "undefined" && req.body.endDate.length==0) isValid=false;

    if(isValid){
        herosModel.findByIdAndUpdate(req.params.heroId, req.body, {new: true})
        .then(hero=>{
            if(hero){
                res.json({
                    message: `Hero with id ${req.params.heroId} is updated`,
                    data: hero
                })
            }
            else{
                res.status(404).json({
                    message:`There is no hero with id ${req.params.heroId}`
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



exports.deleteAHero=(req,res)=>{
    herosModel.findById(req.params.heroId)
    .then(hero=>{
        if(hero){
            herosModel.findByIdAndRemove(req.params.heroId)
            .then(()=>{
                res.json({
                    message: `Hero with id ${req.params.heroId} is deleted`
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
                message: `There is no hero with id ${req.params.heroId}`,
            })
        }
    })
    .catch(err=>{
        res.status(404).json({
            message: `There is no hero with id ${req.params.heroId}`
        })
    })
}