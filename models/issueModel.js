// models/issueModel.js
import { DataTypes } from 'sequelize';
import Order from './orderModel.js';

const Issue = (sequelize) => {
    const IssueModel = sequelize.define('Issue', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issueStatus: {
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
    IssueModel.belongsTo(Order(sequelize), { foreignKey: 'orderId' });

    return IssueModel;
};

export default Issue;
