// models/sellerModel.js
import { DataTypes } from 'sequelize';

const Seller = (sequelize) => {
    const SellerModel = sequelize.define('Seller', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        gst: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bpp_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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

    return SellerModel;
};

export default Seller;
