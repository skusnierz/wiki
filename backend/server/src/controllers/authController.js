import User from '../models/user';
import jwt from 'jsonwebtoken';

export default {
    async login (req, res, next) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1200 });
        // return token
        return res.send({ token, _id: req.user._id });
    },

    async register(req, res, next) {
        const { name, email, password, role } = req.body;
        const newUser = new User({ name, email, role });

        User.findOne({email: email}, (err, res) => {})
            .then(async user => {
                if(user) {
                    res.status(406).send({error: "This email exists in data base!"})
                } else {
                    await User.register(newUser, password);
                    res.status(200).send({ data: newUser, message: `User created successfully. Now you can log in.` });
                }
            })
    }

}