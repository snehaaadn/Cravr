import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authCheck(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // convert into array and get token part at 1st index

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}