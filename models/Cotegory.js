const mongoose = require('mongoose');

const CotegorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Cotegory = mongoose.model('category', CotegorySchema);

module.exports = Cotegory;