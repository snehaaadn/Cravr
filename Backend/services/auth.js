import jwt from "jsonwebtoken";

const secretKey = process.env.JWTSECRETKEY || "your_secret_key";

function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function getUser(token) {
    if(!token) return null;
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded;
    } catch(err) {
        return null;
    }
}

export {setUser, getUser};