import React from "react";
import { Link } from "react-router-dom";

function Aboutpage(){
    return (
        <>
        <div className="max-w-7xl mx-auto px-6 py-12 font-merriweather font-extralight">
            <h1 className="text-5xl font-bold mb-6">About Cravr</h1>
            <p className="text-lg mb-4">
                Welcome to Cravr, your ultimate food delivery companion! We are dedicated to bringing you a diverse selection of restaurants and cuisines right to your doorstep.
            </p>
            <p className="text-lg mb-4">
                Our mission is to make food ordering easy, convenient, and enjoyable. Whether you're craving a quick snack or a full-course meal, Cravr has got you covered.
            </p>
            <p className="text-lg mb-4">
                At Cravr, we believe in quality and variety. We partner with top-rated restaurants to ensure that you have access to the best food options in town. From local favorites to international delights, there's something for everyone.
            </p>
            <p className="text-lg mb-4">
                Our user-friendly platform allows you to browse menus, read reviews, and place orders with just a few clicks. Plus, our reliable delivery service ensures that your food arrives hot and fresh.
            </p>
            <p className="text-lg mb-4">
                Thank you for choosing Cravr. We look forward to serving you and satisfying your cravings!
            </p>
            <Link to="/" className="text-orange-600 hover:underline">Back to Home</Link>
        </div>
        </>
    )
}
export default Aboutpage;