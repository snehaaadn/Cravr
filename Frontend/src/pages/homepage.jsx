import react from "react";
import HeroSection from "../components/heroSection";
import CategoryPage from "./category";

function Homepage(){
    return(
        <div className="flex flex-col max-w-full min-h-screen">
            <HeroSection />
            <CategoryPage />
        </div>
    )
}
export default Homepage;