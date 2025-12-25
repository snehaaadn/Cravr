import React from "react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/burger.mp4";

function Aboutpage() {
  return (
    <div className="relative min-h-screen w-full font-merriweather font-extralight">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>


      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen text-center px-6 text-white">
        <div className="max-w-4xl mx-auto py-12">
          
          <h1 className="text-6xl font-bold mb-8 text-amber-400 drop-shadow-lg">
            About Cravr
          </h1>
          
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-100">
            <p>
              Welcome to <span className="font-bold text-amber-400">Cravr</span>, your ultimate food delivery companion! We are dedicated to bringing you a diverse selection of restaurants and cuisines right to your doorstep.
            </p>
            <p>
              Our mission is to make food ordering easy, convenient, and enjoyable. Whether you're craving a quick snack or a full-course meal, Cravr has got you covered.
            </p>
            <p>
              At Cravr, we believe in quality and variety. We partner with top-rated restaurants to ensure that you have access to the best food options in town.
            </p>
            <p>
              Our user-friendly platform allows you to browse menus, read reviews, and place orders with just a few clicks. Plus, our reliable delivery service ensures that your food arrives hot and fresh.
            </p>
            <p className="font-semibold text-amber-200">
              Thank you for choosing Cravr. We look forward to serving you!
            </p>
          </div>

          <div className="mt-10">
            <Link 
              to="/" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold transition duration-300 shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;