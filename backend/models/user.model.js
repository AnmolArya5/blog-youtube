import mongoose, { Types } from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        Types : String,
        required : true,
        unique : true,
    },
    email : {
        Types : String,
        required : true,
        unique : true,
    },
    password : {
        Types : String,
        required : true,
    },
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;