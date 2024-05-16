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
    }, {
        freezeTableName: true,
    });

    return SellerModel;
};

export default Seller;
