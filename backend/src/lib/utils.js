import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    if (!userId) {
        throw new Error("User ID is required to generate token");
    }

    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("jwt", token, cookieOptions);

    return token;
};
