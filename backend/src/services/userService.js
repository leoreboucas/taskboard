const User = require("../models/User");

const UserService = {
    async verifyIfExists(email = null, id = null) {
        try {
            const userToEmail = await User.findOne({ email: email });
            const userToId = await User.findOne({ auth0_id: id });
            if (userToEmail) {
                return userToEmail;  
            } else if (userToId ){
                return userToId;  
            } else {
                return null; 
            }
        } catch (error) {
            console.error("Erro ao verificar usuário:", error.message);
            throw new Error(`Erro ao verificar usuário: ${error.message}`);
        }
    },
    async registerUser (data) {
        const { email, name, username, auth0_id, imageProfile } = data;

        const userData = {
            name,
            username,
            auth0_id,
            imageProfile
        };

        if (email) {
            userData.email = email;
        }

        return await User.create(userData);
    },
    async viewProfile (sub) {
        return await User.findOne({ auth0_id: sub })
    },
    async deleteProfile(email) {
        return await User.deleteOne({ email: email })
    }
};

module.exports = UserService;