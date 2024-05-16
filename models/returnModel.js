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
    }, {
        freezeTableName: true,
    });

    // Define association to Order
    ReturnModel.belongsTo(Order(sequelize), { foreignKey: 'orderId' });

    return ReturnModel;
};

export default Return;
