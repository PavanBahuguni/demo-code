const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const clientSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, match: /\+91\s*([0-9]{10})/, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    zip: { type: String, match: /[0-9]{6}/, required: true }
});

exports.Client = mongoose.model('clients', clientSchema);