const Ticket = require('./ticketModel');

// Buy a ticket
exports.buyTicket = async (req, res) => {
    const { buyer, ticketId, price } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.owner !== 'eventOrganizer') {
        return res.status(400).json({ message: "Ticket already sold" });
    }

    // Update ticket ownership
    ticket.owner = buyer;
    ticket.price = price;
    await ticket.save();

    return res.status(200).json({ message: "Ticket purchased successfully" });
};

// Return a ticket (refund)
exports.returnTicket = async (req, res) => {
    const { ticketId, buyer } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket || ticket.owner !== buyer) {
        return res.status(404).json({ message: "Ticket not found or you are not the owner" });
    }

    if (!ticket.isResellable) {
        return res.status(400).json({ message: "Ticket cannot be resold" });
    }

    // Transfer ticket back to the organizer
    ticket.owner = 'eventOrganizer';
    await ticket.save();

    return res.status(200).json({ message: "Ticket returned and refunded successfully" });
};

// Resell a ticket by organizer
exports.resellTicket = async (req, res) => {
    const { ticketId, resalePrice, buyer } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket || ticket.owner !== 'eventOrganizer') {
        return res.status(404).json({ message: "Ticket not found or not available for resale" });
    }

    if (resalePrice > ticket.price * ticket.resalePriceCap / 100) {
        return res.status(400).json({ message: "Resale price exceeds allowed limit" });
    }

    ticket.owner = buyer;
    ticket.price = resalePrice;
    await ticket.save();

    return res.status(200).json({ message: "Ticket resold successfully" });
};
