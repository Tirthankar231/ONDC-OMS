// models/settlementDetailsModel.js
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
        orderId: {
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

    SettlementDetailsModel.associate = (models) => {
        SettlementDetailsModel.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    };

    return SettlementDetailsModel;
};

export default SettlementDetails;
