import react from "react";
import ad1 from "../assets/food_ad1.webp";
import ad2 from "../assets/food_ad3.webp";
import ad3 from "../assets/food_ad4.webp";

function adCard(img, text) {
    return (
        <div className="relative w-60 h-70 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <img src={img} className="w-full h-full object-cover rounded-3xl"/>
            <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 hover:bg-black/50"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold text-center w-full px-4 p-2 z-10">
                {text}
            </div>
        </div>
    )
}

function HeroSection(){
    const ads = [
        {img: ad1, text: "Ad 1"},
        {img: ad2, text: "Ad 2"},
        {img: ad3, text: "Ad 3"},
    ];

    return(
        <div className="flex flex-col justify between max-w-full min-h-screen bg-amber-200">
            <div>

            </div>
            <div className="flex flex-row items-center justify-center space-x-30 py-10">
                {ads.map((ad, idx) => (
                    <div key={idx}>
                        {adCard(ad.img, ad.text)}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HeroSection;