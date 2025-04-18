const User = require("../models/User");
const UserService = require("../services/userService");
exports.verifyUser = async (req, res) => {
    try {
        const user = await UserService.verifyIfExists(req.query.email, req.query.id)
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(200).json(null);
        }

    } catch (error) {
        console.error('Erro no backend:', error);
        return res.status(500).json({ message: 'Erro interno do servidor', details: error.message });
    }
};

exports.registerUser = async(req, res) => {
    try {
        const request = req.body
        return UserService.registerUser(request)
    } catch (error) {
        console.error('Erro no backend:', error);
        return res.status(500).json({ message: 'Erro interno do servidor', details: error.message });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const user = await UserService.viewProfile(req.auth.sub)
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar perfil." });
    }
};
