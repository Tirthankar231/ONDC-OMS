import Order from '../config/mongo.js';
import  orderService from '../service/orderService.js';
import sellerService from '../service/sellerService.js';

const { createSeller } = sellerService;
const { createOrder } = orderService;

const migrateData = async (req, res) => {
    try {
        // Fetch orders from MongoDB
        const orders = await Order.find({}).sort({ createdAt: 1 }).limit(1).lean();

        for (let order of orders) {
            if (order.id) {
                let newSeller;
                try {
                    // Create a new seller
                    newSeller = await createSeller(
                        'GST' + Math.random().toString(36).substring(2, 15),
                        'PAN' + Math.random().toString(36).substring(2, 15),
                        order.bppId,
                        order.bppId
                    );
                    console.log('SELLER', newSeller);
                    console.log(`Seller ${newSeller.name} inserted successfully`);
                } catch (err) {
                    console.error('Error inserting seller:', err);
                    continue; // Skip to next order if seller insertion fails
                }

                try {
                    // Create a new order
                    const newOrder = await createOrder(
                        order.id,
                        order.quote?.price?.currency ?? 'INR',
                        parseFloat(order.quote?.price?.value ?? '0'),
                        parseFloat(order.settlementDetails?.['@ondc/org/buyer_app_finder_fee_amount'] ?? '0'),
                        order.settlementDetails?.collected_by ?? 'NA',
                        order.settlementDetails?.type ?? 'NA',
                        order.state ?? 'NA',
                        newSeller.dataValues.id
                    );
                    console.log(`Order ${newOrder.orderId} inserted successfully`);
                } catch (err) {
                    console.error('Error inserting order:', err);
                }
            }
        }
        
        res.status(200).send('Migration successful');
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Internal Server Error');
    }
};

export { migrateData };
