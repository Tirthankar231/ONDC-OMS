// models/orderModel.js
import { DataTypes } from 'sequelize';
import Seller from './sellerModel.js';

const Order = (sequelize) => {
    const OrderModel = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        bff: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        paymentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
    });

    // Define association to Seller
    OrderModel.belongsTo(Seller(sequelize), { foreignKey: 'id' });

    return OrderModel;
};

export default Order;
