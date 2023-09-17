import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (user) => {
    //Set up the token
    const maxAge = 3600000;
    const jwtToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
    );

    return jwtToken;
};

export default generateToken;