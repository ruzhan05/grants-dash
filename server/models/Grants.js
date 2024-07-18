const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/grants', {

});

const grantSchema = new mongoose.Schema({
    title: String,
    link: String,
    docnum: String,
    organization: String,
    releaseDate: String,
    expiryDate: String,
});

const GrantModel = mongoose.model('Grant', grantSchema);

module.exports = GrantModel;
