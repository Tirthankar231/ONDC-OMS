import { DataTypes } from 'sequelize';

const Role = (sequelize) => {
    const RoleModel = sequelize.define('Role', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    RoleModel.associate = function (models) {
        RoleModel.belongsToMany(models.User, { through: 'UserRole' });
    };

    return RoleModel;
};

export default Role;
