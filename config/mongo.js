import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const orderSchema = new mongoose.Schema({
    _id: String,
    provider: {
        transactionId: String
    },
    addOns: [String],
    bppId: String,
    bpp_uri: String,
    createdAt: Date,
    fulfillments: [Object],
    items: [Object],
    messageId: String,
    offers: [String],
    parentOrderId: String,
    paymentStatus: String,
    updatedAt: Date,
    userId: String,
    billing: Object,
    payment: Object,
    quote: Object,
    settlementDetails: Object,
    tags: [Object],
    city: String,
    domain: String,
    id: String,
    state: String,
    sellerId: String,
    updatedQuote: Object
}, { timestamps: true });
const Order = mongoose.model('Order', orderSchema);

mongoose.connect(process.env.MONGO);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

export default Order;
