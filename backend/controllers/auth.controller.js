import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res ) => {
   const { username, email, password } = req.body;

if(!username || !email || !password || username === '' || email === '' || password === '') {
  return res.states(400).json({ message: 'all fileds require'});
};

const hasedPassword = bcryptjs.hashSync(password, 10);

const newUser = new User ({
    username,
    email,
    password: hasedPassword,
});

try { await newUser.save();
res.json('signup sussesfull');

} catch (error) {
     res.status(500).json({message: error.message});
}
};


