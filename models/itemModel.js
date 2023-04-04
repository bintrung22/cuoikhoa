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
        type: String
    },
    imageList: [{
        type: String,
        required: true
    }],
    isTrade: {
        type: Boolean,
        default: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isRemoved: {
        type: Boolean,
        default: false
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;