import db from "../config/sequelize-config.js";
import bcrypt from "bcrypt";

const authenticate = async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        return null;
    }

    return user;
};

export default authenticate;
