import react from "react";
import FavItems from "../components/favItems.jsx";
import Addresses from "../components/addresses.jsx";

const renderView = (view) => {
    switch (view) {
        case 'favourites':
            return <FavItems />;
        case 'addresses':
            return <Addresses />;
        case 'orders':
            return <div>Your Orders will be displayed here.</div>;
        default:
            return <div>Select a view.</div>;
    }
};

function ProfilePage() {
    const name = "Tushar"; // From DB
    const contact = 987969 // From DB
    const user = true; // From Auth Context
    const orders = 15; // From DB
    const moneySpent = 2500; // From DB
    const cravrCoins = 300; // From DB
    const [activeView, setActiveView] = react.useState('orders'); // 'favourites' or 'addresses' or 'orders'

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex flex-col rounded-2xl p-6 space-y-6">

                <div className="flex flex-row justify-between p-4 shadow-md rounded-2xl">

                    {/* Name */}
                    <div>
                        <div className=" bg-gray-50 space-y-2 font-serif rounded-2xl border-2 border-orange-400 p-6 shadow-lg">
                            <p className="font-bold text-2xl">Welcome to Cravr, {user ? name : 'Guest'}!</p>
                            <p className="font-mono font-light">{user ? contact : '13238758758'}</p>
                        </div>
                    </div>

                    {/* Other items */}
                    <div className="flex flex-row space-x-6">
                        <div className="flex flex-col space-y-2 bg-gray-50 font-serif rounded-2xl border-2 border-orange-400 p-6 shadow-lg">
                            <p>Total Orders</p>
                            <p className="font-bold text-2xl">{orders}</p>
                        </div>

                        <div className="flex flex-col space-y-2 bg-gray-50 font-serif rounded-2xl border-2 border-orange-400 p-6 shadow-lg">
                            <p>Money Spent</p>
                            <p className="font-bold text-2xl">{moneySpent}</p>
                        </div>

                        <div className="flex flex-col space-y-2 bg-gray-50 font-serif rounded-2xl border-2 border-orange-400 p-6 shadow-lg">
                            <p>Cravr Coins</p>
                            <p className="font-bold text-2xl">{cravrCoins}</p>
                        </div>
                    </div>





                </div>

                <div className="flex flex-row justify-between p-4 shadow-md rounded-2xl">

                    <div className="flex flex-col space-y-4 mx-4 items-start justify-start text-lg font-mono">
                        <button
                            onClick={() => setActiveView('orders')}
                            className=" hover:border-b-2 border-gray-400 hover:text-orange-600 hover:translate-x-2 hover:font-medium hover:duration-300"                            >
                            Orders
                        </button>
                        <button
                            className=" hover:border-b-2 border-gray-400 hover:text-orange-600 hover:translate-x-2 hover:font-medium hover:duration-300"
                            onClick={() => setActiveView('favourites')}
                        >
                            Favourites
                        </button>
                        <button

                            className=" hover:border-b-2 border-gray-400 hover:text-orange-600 hover:translate-x-2 hover:font-medium hover:duration-300"
                            onClick={() => setActiveView('addresses')}
                        >
                            Addresses
                        </button>
                        <button
                            className=" hover:border-b-2 border-gray-400 hover:text-orange-600 hover:translate-x-2 hover:font-medium hover:duration-300"                            >

                            Log Out
                        </button>
                    </div>

                    <div className="w-4/5 pl-6 border-l-2 border-gray-300">
                        {renderView(activeView)}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ProfilePage;
