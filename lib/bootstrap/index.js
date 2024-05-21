import roles from './roles';
import users from './users';
import {models} from '../../models/index.js';
import {SYSTEM_ROLES} from '../../utils/constants';
import {asyncForEach} from '../../utils/utilityFunctions';

async function BootstrapData() {
    // create roles
    try {
        await models.Role.bulkCreate([...roles.map((role) => {
            return {name: role}
        })])
    } catch (err) {
    }

    // create super admin users
    try {
        const role = await models.Role.findOne({
            name: SYSTEM_ROLES.SUPER_ADMIN
        })
        await asyncForEach(users, async (sa) => {
            try {
                const user = await models.User.create(sa)
                await models.UserRole.create({
                    UserId: user.id,
                    RoleId: role.id,
                })
            } catch (err) {
            }
        })
    } catch (err) {
    }
}

export default BootstrapData;