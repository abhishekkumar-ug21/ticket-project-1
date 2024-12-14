const express = require('express');
const router = express.Router();
const Ticket = require('./ticketModel');
const ticketController = require('./ticketController');

// Route to view tickets
router.get('/tickets', async (req, res) => {
    const tickets = await Ticket.find();
    res.render('tickets', { tickets });
});

// Buy a ticket (form submission)
router.post('/buy-ticket', ticketController.buyTicket);

module.exports = router;
