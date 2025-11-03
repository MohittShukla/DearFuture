const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for backward compatibility with existing messages
    },
    message: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    delivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
