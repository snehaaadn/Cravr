import react from "react";
import HeroSection from "../components/heroSection";

function Homepage(){
    return(
        <div className="flex flex-col max-w-full min-h-screen">
            <HeroSection />
        </div>
    )
}
export default Homepage;