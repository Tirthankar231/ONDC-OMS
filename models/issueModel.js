// models/issueModel.js
import { DataTypes } from 'sequelize';

const Issue = (sequelize) => {
    const IssueModel = sequelize.define('Issue', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        issueId: {
            type: DataTypes.STRING,
            allowNull: false,
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

    IssueModel.associate = (models) => {
        IssueModel.belongsTo(models.Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    };

    return IssueModel;
};

export default Issue;
