let sql = require('./database.js');

//Task object constructor
let Task = function(task){
    this.id=task.id;
    this.user_id = task.user_id;
    this.status = task.status;
    this.description=task.description;
    this.created_at = new Date();
};

Task.createTask = function (newTask, result) {
    sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });
};
Task.getTaskById = function (taskId, result) {
    sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Task.getAllTask = function (userId, result) {
    sql.query("SELECT * FROM tasks where user_id = ? ORDER BY id DESC;", [userId],function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);

            result(null, res);
        }
    });
};
Task.updateById = function(id, task, result){

    // task.slice();
    sql.query("UPDATE tasks SET description = ?, status = ? WHERE id = ?", [task.description, task.status, task.id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log(res);
            result(null, res);
        }
    });
};
Task.remove = function(id, userId, result){
    sql.query("DELETE FROM tasks WHERE id = ? and user_id = ?", [id, userId], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Task;