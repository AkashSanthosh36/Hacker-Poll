const mongoose = require('mongoose');

const IpList = mongoose.Schema({
    name: {
        type: String, 
        default: 'Ip'
    },
    ipList: [{ type: String }]
});

module.exports = mongoose.model("IpList", IpList);