const axios = require("axios");

exports.getAuthToken = async (req, res) => {
    try {
        const response = await axios.post(process.env.AUTH0_DOMAIN, {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_API_IDENTIFIER,
            grant_type: "client_credentials",
        }, {
            headers: { "Content-Type": "application/json" },
        });

        res.json({ token: response.data.access_token });
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter token", error: error.response?.data || error.message });
    }
};