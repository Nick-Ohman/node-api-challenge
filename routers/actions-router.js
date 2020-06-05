const router = require('express').Router();
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');



router.get('/:id/actions', checkID, (req, res) => {
    Actions.get()
    .then(resp => {
        if(resp.length === 0){
            res.status(404).json({
                message: "there are no actions for this project"
            })
        } else {
            res.status(200).json({
                message: "ok",
                actions: resp
            })
        }
    })
})

router.get('/:id/actions/:actionid', checkID, checkActionsID, (req, res) => {
    Actions.get(req.params.actionid)
    .then(action => {
        res.status(200).json({
            status: "OK",
            action: action
        })
    })
    .catch(error => {
        res.status(500).json({
            status: "failure",
            error: error
        })
    })
})

router.post('/:id/actions', checkID, checkActionsBody, (req, res) => {
    const actionbody = req.body;
    const project_id = req.params.id
    const newAction = {description: actionbody.description, notes: actionbody.notes, project_id}
    Actions.insert(newAction)
    .then(action => {
        res.status(200).json({
            action: action
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "error creating action",
            error: error
        })
    })
})

router.put('/:id/actions/:actionid', checkID, checkActionsID, checkActionsBody, (req, res) => {
    const actionID = req.params.actionid
    const project_id = req.params.id
    const updatedAction = {description: req.body.description, notes: req.body.notes, project_id}
    Actions.update(actionID, updatedAction)
    .then(action => {
        res.status(200).json({
            message: "update successfull",
            action: action
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "could not update action",
            error: error
        })
    })
})
router.delete("/:id/actions/:actionid", checkID, checkActionsID, (req, res) => {
    Actions.remove(req.params.actionid)
    .then(resp => {
        res.status(200).json({
            message: "deleted successfully"
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "could not delete action",
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

function checkActionsID(req, res, next){
    const id = req.params.actionid
    Actions.get(id)
    .then(project => {
        if(project === null){
            res.status(404).json({
                status: "failure",
                errorMessage: "No action with that ID"
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

function checkActionsBody(req, res, next){
    const actionDesc = req.body.description
    const actionNotes = req.body.notes
    if(!actionDesc && typeof String || actionDesc.length > 128 || !actionNotes && typeof String){
        res.status(400).json({
            error: "Please check that you have entered the notes and description, and that our description is less than 128 characters"
        })
    }else{
        next();
    }

}




module.exports = router;