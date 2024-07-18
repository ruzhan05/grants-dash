const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grants', {

});

const gggrantSchema = new mongoose.Schema({
    Title: String,
    OpportunityLink: String,
    OpportunityId: String,
    Department: String,
    PostedDate: String,
    ClosingDate: String,
});


const GGGrantModel = mongoose.model('gggrants', gggrantSchema);

module.exports = GGGrantModel;