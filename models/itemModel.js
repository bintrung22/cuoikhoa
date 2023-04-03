const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    imageList: {
        type: String,
        required: true
    },
    isTrade: {
        type: String,
        default: null
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;