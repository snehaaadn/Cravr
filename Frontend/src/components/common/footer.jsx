import React from "react";
import logo from "../../assets/logo.png";


const year = new Date().getFullYear();

// --- Helper Component ---
const FooterLink = ({ text, href }) => (
  <li>
    <a 
        href={href} 
        className="inline-block transition-all duration-300 ease-in-out hover:text-amber-400 hover:translate-x-2 hover:font-medium text-gray-400" 
    > 
        {text} 
    </a>
  </li>
);

function Footer() {
    return (
        <footer className="w-full bg-stone-900 shadow py-8 border-t border-gray-800 font-merriweather text-amber-50">
            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
                
                {/* --- Section 1: Brand --- */}
                <div className="flex flex-col justify-center items-center h-full sm:items-start lg:items-center group">
                    <div className="flex items-center gap-2 mb-3">
                        <img 
                            src={logo} 
                            alt="Cravr Icon" 
                            className="h-10 w-auto transition-transform duration-500 ease-in-out group-hover:-rotate-12 filter brightness-110" 
                        /> 
                        <span className="text-3xl font-pacifico font-bold tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
                            Cravr
                        </span>
                    </div>
                    <div className="text-center sm:text-left lg:text-center text-gray-500 text-sm leading-relaxed">
                        © {year} Cravr. All rights reserved.
                        <br />
                        Made by 
                        <a href="https://www.linkedin.com/in/sneha-debnath-521867289/" className="mx-1 text-amber-100 font-semibold hover:text-black hover:bg-amber-400 px-1 rounded transition-all duration-300">Sneha</a> 
                        & 
                        <a href="https://www.linkedin.com/in/tushargnita/" className="mx-1 text-amber-100 font-semibold hover:text-black hover:bg-amber-400 px-1 rounded transition-all duration-300">Tushar</a>.
                    </div>
                </div>

                {/* --- Section 2: Country Categories --- */}
                <div className="flex flex-col items-start pl-4 sm:pl-0 lg:pl-8"> 
                    <h2 className="text-lg font-bold text-amber-50 mb-6 relative w-fit after:block after:content-[''] after:absolute after:h-0.5 after:bg-amber-500 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left cursor-default">
                        Categories
                    </h2>
                    <ul className="flex flex-col space-y-3 text-base">
                        <FooterLink text="Italian" href="/search?q=Italian" />
                        <FooterLink text="Chinese" href="/search?q=Chinese" />
                        <FooterLink text="Japanese" href="/search?q=Japanese" />
                        <FooterLink text="Korean" href="/search?q=Korean" />
                        <FooterLink text="North Indian" href="/search?q=North Indian" />
                        <FooterLink text="South Indian" href="/search?q=South Indian" />
                        <FooterLink text="Bengali" href="/search?q=Bengali" />
                        <FooterLink text="American" href="/search?q=American" />
                    </ul>
                </div>

                {/* --- Section 3: Food Types --- */}
                <div className="flex flex-col items-start pl-4 sm:pl-0 lg:pl-8 -mt-4 sm:mt-0">
                    <div className="h-13 hidden lg:block"></div> 
                    <ul className="flex flex-col space-y-3 text-base">
                        <FooterLink text="Appetizers" href="/search?q=Appetizers" />
                        <FooterLink text="Desserts" href="/search?q=Desserts" />
                        <FooterLink text="Small Eats" href="/search?q=Small Eats" />
                        <FooterLink text="Main Course" href="/search?q=Main Course" />
                        <FooterLink text="Wraps & Rolls" href="/search?q=Wraps & Rolls" />
                        <FooterLink text="Bakery" href="/search?q=Bakery" />
                        <FooterLink text="Smoothies & Juices" href="/search?q=Smoothies & Juices" />
                        <FooterLink text="Seafood" href="/search?q=Seafood" />
                    </ul>
                </div>

                {/* --- Section 4: Dietary --- */}
                <div className="flex flex-col items-start pl-4 sm:pl-0 lg:pl-8 -mt-4 sm:mt-0">
                    <div className="h-13 hidden lg:block"></div> 
                    <ul className="flex flex-col space-y-3 text-base">
                        <FooterLink text="Vegan" href="/search?q=Vegan" />
                        <FooterLink text="Vegetarian" href="/search?q=Vegetarian" />
                        <FooterLink text="Healthy" href="/search?q=Healthy" />
                        <FooterLink text="Gluten-free" href="/search?q=Gluten-free" />
                        <FooterLink text="Organic" href="/search?q=Organic" />
                    </ul>
                </div>

            </div>
        </footer>
    )
}
export default Footer;