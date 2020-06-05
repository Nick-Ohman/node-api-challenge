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


router.get('/:id', checkID, (req, res) => {
    const id = req.params.id
    Projects.get(id)
    .then(project => {
        res.status(200).json({
            status: "success",
            project: project
        })
    })
})

router.post('/', checkProjectBody, (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(project =>{
        res.status(201).json({
            message: "Project Created Successfully",
            project: project
        })
    })
    .catch(error => {
        res.status(500).json({
            status: "failure",
            error: error
        })
    })
})

router.put('/:id', checkID, checkProjectBody, (req, res) => {
    const id = req.params.id
    const updatedPro = req.body
    Projects.update(id, updatedPro)
    .then(project => {
        res.status(201).json({
            status: "success",
            updatedProj: project
        })
    })
    .catch(error => {
        res.status(500).json({
            status: "failure",
            error: error
        })
    })
})

router.delete('/:id', checkID, (req, res)=> {
    console.log("req.body");
    Projects.remove(req.params.id)
    .then(resp => {
        if(resp === 1){
            res.status(204).json({
                status: "successfull",
                message: "you successfully deleted the project"
            })
        } else {
            res.status(500).json({
                status: "failure",
                error: "Could not delete resource"
            })
        }
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