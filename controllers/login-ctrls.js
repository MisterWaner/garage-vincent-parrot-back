import generateToken from "../functions/generateToken.js";
import authenticate from "../functions/authenticate.js";

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
            maxAge: 60 * 60 * 24,
        });
        res.status(200).json({
            token,
            role: user.role,
            id: user.id,
            message: "Connexion reussie",
        });
    }
};

export { login };