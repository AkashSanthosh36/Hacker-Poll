const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    challengesSolved: {
        type: Number,
        required: true
    },
    expertiseLevel: {
        type: Number,
        required: true
    },
    expertiseIn : [{
        skillName: {
            type: String,
            required: true
        }, 
        level: {
            type: Number,
            required: true
        }
    }],
    totalVotes: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Candidate", CandidateSchema);