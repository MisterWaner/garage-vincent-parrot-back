import generateToken from "../functions/generateToken.js";
import authenticate from "../functions/authenticate.js";

//Controller for login, that authenticate user and generate a token
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticate(email, password);

    if (!user) {
        return res
            .status(401)
            .json({ message: "Utilisateur ou mot de passe incorrect" });
    } else {
        const token = generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 3600000,
        });
        res.status(200).json({
            token: token,
            role: user.role,
            firstname: user.firstname,
            message: "Connexion reussie",
        });
    }
};

export { login };