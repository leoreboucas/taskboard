const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        email: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Email inválido']
        },
        auth0_id: {type: String, unique: true, required:true},
        imageProfile: { type: String, required: true, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8T9kezNw71kHzoJPpsWY0ucofQG0CA1yaA&s' }
    },
    { timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
