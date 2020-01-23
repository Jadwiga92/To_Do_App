const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Task = require("../model/tasks.js");
const bodyParser = require("body-parser");
const valid = require('../helpers/errorHandle')
const {task} = require('../validation');


router.use(
    bodyParser.urlencoded({
        extended: true
    })
);

router.post("/", [valid(task)],  async (req, res) => {
    if (!req.body.description || req.body.description > 1000) {
        //400 Bad Request
        res
            .status(400)
            .send("the text cannot be longer than 1000 characters");
        return;
    }
    let newTask = new Task(_.pick(req.body, ["status", "description"]));
    try {
        newTask.user_id = req.userId;
         await Task.createTask(newTask, (err,response)=>{
            if(err) {
                console.log("error: ", err);
                res.status(500).send()
            }
            else{
                console.log(response);
              res.send();
            }
        });

    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
});

router.get("/",  (req, res) => {

  Task.getAllTask(req.userId, (error, result)=>{
        if(error){
            res.status(500).send();
        } else {
            res.send(result)
        }
    });

});

// body should include: text, status
router.put("/:id",  (req, res) => {
    let result;
let task = req.body;
let id = req.params.id;

         Task.updateById(id, task,(error, result)=>{
        if (error) {
            res.send("Update was unsuccessful");
        } else {
            res.send("Update was successful");
        }


})});

router.delete("/:id",  (req, res) => {
const id = req.params.id;
         Task.remove(id, req.userId,(error, result)=>{
            if (error) {
                res.status(404).send(result);
            } else {
                res.send(result);
            }

        });




});
module.exports = router;
