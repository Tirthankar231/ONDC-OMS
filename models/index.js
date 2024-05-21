import Sequelize from 'sequelize';
import sequelize from '../config/db.js';
import OrderModel from './orderModel.js';
import SellerModel from './sellerModel.js';
import IssueModel from './issueModel.js';
import ReturnModel from './returnModel.js';
import SettlementDetailsModel from './settlementDetailsModel.js';

const models = {
    Order: OrderModel(sequelize),
    Seller: SellerModel(sequelize),
    Issue: IssueModel(sequelize),
    Return: ReturnModel(sequelize),
    SettlementDetails: SettlementDetailsModel(sequelize),
};

// Define associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export { models };
