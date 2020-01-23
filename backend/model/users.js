let sql = require('./database.js');


let User = function(user){
    this.id=user.id;
    this.email = user.email;
    this.password=user.password;
    this.created_at = new Date();
};
User.createUser = function (newUser, result) {
    sql.query("INSERT INTO users set ?", newUser, function (err, res) {

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
User.getUserByEmail = function (email, result) {
    sql.query("Select * from users where email = ? ", email, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};

User.getTaskById = function (taskId, result) {
    sql.query("Select users from users where id = ? ", taskId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
User.getAllTask = function (result) {
    sql.query("Select * from users", function (err, res) {

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
User.updateById = function(id, task, result){
    sql.query("UPDATE users SET user = ? WHERE id = ?", [task.task, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
User.remove = function(id, result){
    sql.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= User;