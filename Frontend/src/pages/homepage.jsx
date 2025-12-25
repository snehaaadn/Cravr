import react from "react";
import HeroSection from "../components/heroSection";
import CategoryPage from "./category";
import RestaurantPage from "./restaurantpage";

function Homepage(){
    return(
        <div className="flex flex-col max-w-full min-h-screen bg-stone-950 scroll-smooth">
            <HeroSection />
            <CategoryPage />
            <RestaurantPage />
        </div>
    )
}
export default Homepage;