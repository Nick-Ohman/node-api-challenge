const router = require('express').Router();
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');


router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json({
            status: "success",
            projects: projects
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "Server Error",
            error: error
        })
    })
})

// middleware

function checkID(req, res, next){
    const id = req.params.id;
    Projects.get(id)
    .then(project => {
        if(project === null){
            res.status(404).json({
                status: "failure",
                errorMessage: "No Project with that ID"
            })
        }else{
            next();
        }
    })   
   .catch(error => {
       res.status(404).json({
           error: error
       })
   })
}

function checkProjectBody(req, res, next){
    const proName = req.body.name
    const proDesc = req.body.description
    if(!proName && typeof String || !proDesc && typeof String ){
        res.status(400).json({
            error: "Name and Description are required fields"
        })
    } else{
        next();
    }
}


module.exports = router;