import mongoose from 'mongoose';

async function connectDB(url) {
    try {
        await mongoose.connect(url);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
};


export {
    connectDB
}