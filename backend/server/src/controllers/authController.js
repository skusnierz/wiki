import User from '../models/user';
import jwt from 'jsonwebtoken';

export default {
    async login (req, res, next) {
        // generate token
        const { email, _id } = req.body;
        const user = await User.findOne({ email : email });
        const token = jwt.sign({ id: _id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        // return token and user data
        return res.send({ user, token });
    },

    async register(req, res, next) {
        const { name, email, password, role } = req.body;
        const user = new User({ name, email, role });
        await User.register(user, password);

        res.status(200).send('User created successfully. Now you can log in.');
    },

    async findAll(req, res) {
        const users = await User.find().sort({ createdAt: 'desc' });
        return res.status(200).send({ data: users });
    },

   
}