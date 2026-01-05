import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const year = new Date().getFullYear();

const FooterLink = ({ text, query }) => (
  <li>
    <Link
      to={`/search?q=${encodeURIComponent(query)}`}
      className="inline-block text-gray-400 transition-all duration-300 ease-in-out hover:text-amber-400 hover:translate-x-2 hover:font-medium"
    >
      {text}
    </Link>
  </li>
);

function Footer() {
  return (
    <footer className="w-full bg-stone-900 border-t border-gray-800 py-8 font-merriweather text-amber-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="flex flex-col justify-center items-center h-full sm:items-start lg:items-center group"> 
          <div className="flex items-center gap-2 mb-3"> 
            <img 
            src={logo} 
            alt="Cravr Icon" 
            className="h-10 w-auto transition-transform duration-500 ease-in-out group-hover:-rotate-12 filter brightness-110" 
            /> 
            <span className="text-3xl font-pacifico font-bold tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors duration-300"> Cravr </span> 
          </div> 
          <div className="text-center sm:text-left lg:text-center text-gray-500 text-sm leading-relaxed"> © {year} Cravr. All rights reserved. 
            <br /> 
            Made by <a href="https://www.linkedin.com/in/sneha-debnath-521867289/" className="mx-1 text-amber-100 font-semibold hover:text-black hover:bg-amber-400 px-1 rounded transition-all duration-300">Sneha</a> & <a href="https://www.linkedin.com/in/tushargnita/" className="mx-1 text-amber-100 font-semibold hover:text-black hover:bg-amber-400 px-1 rounded transition-all duration-300">Tushar</a>. 
          </div> 
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold mb-4">Categories</h2>
          <ul className="space-y-3">
            <FooterLink text="Italian" query="Italian" />
            <FooterLink text="Chinese" query="Chinese" />
            <FooterLink text="Japanese" query="Japanese" />
            <FooterLink text="Korean" query="Korean" />
            <FooterLink text="North Indian" query="North Indian" />
            <FooterLink text="South Indian" query="South Indian" />
            <FooterLink text="Bengali" query="Bengali" />
            <FooterLink text="American" query="American" />
          </ul>
        </div>

        {/* Food Types */}
        <div>
          <ul className="space-y-3">
            <FooterLink text="Ice Cream" query="Ice Cream" />
            <FooterLink text="Sweets" query="Sweets" />
            <FooterLink text="Snacks" query="Snacks" />
            <FooterLink text="Main Course" query="Main Course" />
            <FooterLink text="Wraps & Rolls" query="Wraps & Rolls" />
            <FooterLink text="Bakery" query="Bakery" />
            <FooterLink text="Smoothies & Juices" query="Smoothies & Juices" />
            <FooterLink text="Seafood" query="Seafood" />
          </ul>
        </div>

        {/* Dietary */}
        <div>
          <ul className="space-y-3">
            <FooterLink text="Vegan" query="Vegan" />
            <FooterLink text="Vegetarian" query="Vegetarian" />
            <FooterLink text="Healthy" query="Healthy" />
            <FooterLink text="Gluten-free" query="Gluten-free" />
            <FooterLink text="Organic" query="Organic" />
            <FooterLink text="Combos" query="Combo" />
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
