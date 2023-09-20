import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";

//Function to authenticate user, with email and password
const authenticate = async (email, password) => {
    //Check if user exist
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    //Check if password match
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        return null;
    }

    return user;
};

export default authenticate;
