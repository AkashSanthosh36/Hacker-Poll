const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../config/keys');
const Admin = require('../models/Admin');

router.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
   
    Admin.findOne({email: email})
    .then(savedUser => {
        if(!savedUser) {
            return res.status(422).json({
                error: "Invalid email or password"
            });
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                const token = jwt.sign( 
                        {
                            userId: savedUser._id
                        }, 
                        JWT_SECRET_KEY
                    );
                const { email } = savedUser;
                res.status(200).json({
                    token: token,
                    user: { email }
                });
            }
            else {
                return res.status(422).json({
                    error: "Invalid email or password"
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    })
    .catch(error => {
        console.log(error);
    });
});


module.exports = router;