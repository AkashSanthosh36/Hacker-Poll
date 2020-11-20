const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const IpList = require('../models/IpList');

router.post('/ip', (req, res, next) => {
    IpList.findOne({name: 'Ip'})
    .then(data => {
        if(data) {
            if(data.ipList.includes(req.body.ip)) {
                res.status(200).json({
                    message: 'true'
                })
            }
            else {
                res.status(200).json({
                    message: 'false'
                })
            }
        }
        else {
            res.status(200).json({
                message: 'false'
            })
        }
    })
});

router.put('/addIp', (req, res, next) => {
    IpList.find()
    .then(data => {
        if(data.length == 0) {
            const newIp = IpList({
                name: 'Ip',
                ipList: [req.body.ip]
            })

            newIp.save()
            .then(result => {
                res.status(201).json('added')
            })
            .catch(error => {
                console.log(error)
            })
        }
        else {
            IpList.findOneAndUpdate({name: 'Ip'}, 
            {
                $push: {ipList: req.body.ip}
            },
            {
                new: true
            })
            .then(result => {
                res.status(201).json({
                    message: 'Ip list added'
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
    })
    .catch(error => {
        console.log(error)
    })
});

module.exports = router;