const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin')
const Candidate = require('../models/Candidate')

router.get('/allCandidate', (req, res, next) => {
    Candidate.find()
    .then(data => {
        res.status(200).json({
            data: data
        })
    })
    .catch(error => {
        console.log(error)
    })
});

router.get('/get-candidate-details/:id', (req, res, next) => {
    Candidate.findById({_id: req.params.id})
    .then(data => {
        res.status(200).json({
            data: data
        })
    })
    .catch(error => {
        console.log(error)
    })
});

router.post('/add', requireLogin, (req, res, next) => {
    const { name, challengesSolved, expertiseLevel, expertiseIn } = req.body;
    const newCandidate = new Candidate({
        name: name,
        challengesSolved: challengesSolved,
        expertiseLevel: expertiseLevel,
        expertiseIn: expertiseIn   
    });

    newCandidate.save()
    .then(data => {
        res.status(201).json({
            message: "Candidate Added Successfully"
        });
    })
    .catch(error => {
       console.log(error);
    })
});

router.put('/update/:id', requireLogin, (req, res, next) => {
    const { name, challengesSolved, expertiseLevel, expertiseIn } = req.body
    Candidate.findOne({_id: req.params.id})
    .then(data => {
        data.name = name
        data.challengesSolved = challengesSolved
        data.expertiseLevel = expertiseLevel
        data.expertiseIn = expertiseIn

        data.save()
        .then(result => {
            res.status(200).json({
                message:'Updated Successfully'
            })
        })
        .catch(error => {
            console.log(error)
        })
    })
    .catch(error => {
        console.log(error)
    })
});

router.put('/vote', (req, res, next) => {
    const {_id} = req.body;
    Candidate.findByIdAndUpdate(_id, {
        $inc : {totalVotes : 1}
    },
    {
        new: true
    })
    .exec((error, result) => {
        if(error) {
            return res.status(422).json({error: error})
        }
        else {
            res.status(200).json(result)
        }
    });
});

router.delete('/delete-candidate', requireLogin, (req, res, next) => {
    Candidate.findByIdAndDelete(req.body._id, (error, deletedCandidateDetails) => {
        if(error) {
            return res.status(422).json({
                error: error
            })
        }
        res.status(200).json({
            deletedCandidateDetails
        })
    })
});

module.exports = router;