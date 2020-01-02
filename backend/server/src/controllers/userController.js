import User from '../models/user';

export default {
    async findOne(req, res, next) {
        const user = await User.findOne({ '_id': req.params.id });
        if (!user) {
            return next();
        }
        return res.status(200).send({ data: user });
    },

    async findAll(req, res) {
        const users = await User.find();
        return res.status(200).send({ data: users });
    },

    async remove(req, res, next) {
        const user = await User.findOne({ '_id': req.params.id });
        if (!user) return next();
        await user.remove();
        return res.status(200).send({ message: `User was removed` });
    },

    async update(req, res, next) {
        const user = await User.findOne({ '_id': req.params.id  });
        if (!user) return next();
        user.name = req.body.name;
        user.email = req.body.email;
        if( req.body.password != undefined ) {
            user.setPassword(req.body.password);
        }
        await user.save();

        return res.status(200).send({ data: user, message: `User was updated` });
    },
}