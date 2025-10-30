import mongoose, { Types } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin:  { type: Boolean, default: false },
    profilePicture: {
      type: String,
      default:
        'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;