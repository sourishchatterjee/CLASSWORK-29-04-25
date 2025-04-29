const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: { 
        type: Boolean,
        default: false,
    },
    isDataSend: { 
        type: Boolean,
        default: false,
    },
    createdAt: { 
        type: Date,
        default: Date.now,
        expires: '25m', 
    }
}, {
    versionKey: false,
    timestamps: true, 
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
