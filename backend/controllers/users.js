import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js';

export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
}

export const getUserInfo = async (req, res) => {

    console.log("req.params.id", req.params.id)

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('User not found');

    res.json(user)

}


export const createUser = async (req, res) => {

    const user = new User(req.body);

    const saved = await user.save();

    res.status(201).json(saved)
}

// UPDATE user

export const updateUser = async (req, res) => {

    const { id } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found")
        }
        res.json(updatedUser)
    } catch (err) {
        res.status(500).send('Server error')
    }
}

// DELETE user

export const deleteUser = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send("User not found")
        }

        res.send(`User with id ${id} deleted`)

    } catch (err) {
        req.status(500).send('Server error')
    }
}


