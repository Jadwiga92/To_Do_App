const router = require('express').Router();
const User = require('../model/users');
const {register, login} = require('../validation');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const hashing = require('../helpers/passwordHash');
const valid = require('../helpers/errorHandle');
const Joi = require('@hapi/joi');


router.post('/signup', valid(register),  (req, res)=> {

    let email = req.body.email;

  User.getUserByEmail(email, async(error, response)=>{

        if(response.length > 0)return res.status(400).send('Email already exists');

        const hashed =  await hashing(req.body.password);

        const newUser = new User({

            email: req.body.email,
            password: hashed
        });


            const newUserSaving =  User.createUser(newUser, (error, response)=>{
                if(error){
                    res.status(500).send();
                } else {
                    res.send();
                }

            });

            const token = jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET);

            res.header('x-auth', token).send(_.pick(newUserSaving, ['_id', 'email']));

    });

});
router.post('/login', [valid(login)],  async(req, res) => {


    let email = req.body.email;
     User.getUserByEmail(email, async(error, response)=>{

        if(error){
            console.log('error', error);
            res.status(500).send();
        } else {
            if(!response[0])return res.status(400).send('Email doesn\'t exists');

            const correctPassword = await bcrypt.compare(req.body.password, response[0].password);

            if(!correctPassword) {
               return res.status(400).send('Invalid email or password');
            }

         const token = jwt.sign({id: response[0].id}, process.env.TOKEN_SECRET);
            try {
         res.header('x-auth', token).send(_.pick(response[0], ['_id', 'email']));
            }
            catch(exception) {
                console.log(exception);
            }


        }

     });
});



module.exports = router;