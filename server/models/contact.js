const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String, 
        default: new Date(new Date().getTime()+330*60*1000).toISOString("2022-08-24 09:49:30")
        .replace('T', ' ')
        .replace('Z', '').split('.')[0]
    }
});

const Contact = mongoose.model("Contact",ContactSchema)

module.exports = Contact;