const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId: { type: Number, required: true, unique: true },
    owner: { type: String, required: true },
    price: { type: Number, required: true },
    isResellable: { type: Boolean, default: true },
    resalePriceCap: { type: Number, default: 110 }, // 110% resale cap
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
