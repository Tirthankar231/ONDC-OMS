// models/settlementDetailsModel.js
import Order from './orderModel.js';
import { DataTypes } from 'sequelize';

const SettlementDetails = (sequelize) => {
    const SettlementDetailsModel = sequelize.define('SettlementDetails', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        settlementType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        branchName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    });
    // Define association to Order
    SettlementDetailsModel.belongsTo(Order(sequelize), { foreignKey: 'id' });

    return SettlementDetailsModel;
};

export default SettlementDetails;
