import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    role : {
        type: String,
        trim: true,
        required: true,
        default: 'customUser'
    }
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

export default mongoose.model('User', UserSchema);