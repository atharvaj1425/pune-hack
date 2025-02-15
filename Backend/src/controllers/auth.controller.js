import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    try {
        const { email, name, password, address, pincode, role, phoneNumber } = req.body;
       // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password,
            address,
            pincode,
            role,
            phoneNumber,
        })
        await newUser.save();
        res.status(201) .json({message: "User registered"})
    } catch (error) {
        console.log(error)
    }
    
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(404).json({message: "user not found "});
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        return res.status(400).json({ message: "invalid password" })
    }
    const accessToken = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
            name: user.name,
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    return res.status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })  // Secure cookie
    .json({
        accessToken,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
    });
}

export { registerUser, loginUser }
