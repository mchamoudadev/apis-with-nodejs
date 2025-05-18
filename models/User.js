import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePic: String
})


// Hash password before saving

userSchema.pre('save', async function (next) {

    // if the password has been the same
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();

})

// Method to compare password

userSchema.methods.comparePassword = function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;

