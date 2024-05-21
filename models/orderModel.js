// models/orderModel.js
import { DataTypes } from 'sequelize';

const Order = (sequelize) => {
    const OrderModel = sequelize.define('orders', {
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
            type: DataTypes.FLOAT,
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
        state: {
            type: DataTypes.ENUM,
            values: ['Completed', 'Accepted', 'Cancelled', 'In-progress'],
            allowNull: false,
        },
        sellerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal('extract(epoch from now()) * 1000'),
        },
        updatedAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: sequelize.literal('extract(epoch from now()) * 1000'),
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        underscored: true,
    });

    OrderModel.associate = (models) => {
        OrderModel.belongsTo(models.Seller, { onDelete: 'CASCADE' });
        OrderModel.hasMany(models.Issue, { foreignKey: 'orderId', onDelete: 'CASCADE' });
        OrderModel.hasMany(models.Return, { foreignKey: 'orderId', onDelete: 'CASCADE' });
        OrderModel.hasOne(models.SettlementDetails, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    };
    
    return OrderModel;
};

export default Order;
