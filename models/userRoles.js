const UserRole = (sequelize) => {
    return sequelize.define('UserRole', {}, {
        freezeTableName: true,
        timestamps: false,
    });
};

export default UserRole;
