// models/returnModel.js
import { DataTypes } from 'sequelize';
import Order from './orderModel.js';

const Return = (sequelize) => {
    const ReturnModel = sequelize.define('Return', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        returnId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Order(sequelize),
                key: 'id',
            },
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
    // Define association to Order
    ReturnModel.belongsTo(Order(sequelize), { foreignKey: 'id' });

    return ReturnModel;
};

export default Return;
