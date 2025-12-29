import react, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getRestaurantsByLocationName } from '../services/api.js';
import Loading from '../components/common/loading.jsx';
import RestaurantCard from '../components/card/restaurantCard.jsx';
import Pagination from '../components/common/pagination.jsx';
import LocationPrompt from '../components/locationprompt.jsx';
import logo from '../assets/logo.png';

function RestaurantPage() {
    const [searchParams] = useSearchParams();
    const queryLocation = searchParams.get('location');

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const location = queryLocation || 'Bengaluru';
                const response = await getRestaurantsByLocationName(location, currentPage, itemsPerPage);

                const rawData = response.data.restaurants || [];
                setTotalItems(response.data.totalCount || rawData.length);

                const data = rawData.map(item => ({
                    id: item._id,
                    name: item.name,
                    image: logo,
                    location: item.address?.city || item.address?.locality || "Local Area",
                    rating: item.rating || 4.5
                }));

                setResults(data);
            } catch (error) {
                console.error("Failed to fetch restaurants:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [queryLocation, currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-900">
                <Loading />
            </div>
        );
    }

    return (
        <div id='nearByRestaurants' className="min-h-screen bg-stone-950 py-10 px-1 scroll-mt-20 min-w-full mx-auto">
            <h1 className="text-4xl font-bold font-merriweather text-white mb-8 px-10">
                {queryLocation ? (
                    <>
                        Restaurants in{" "}
                        <span className="text-amber-500 capitalize">
                            {queryLocation}
                        </span>
                    </>
                ) : (
                    "Explore Restaurants"
                )}
            </h1>

            {queryLocation ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-5">
                        {
                            results.length > 0 ? (
                                results.map(restaurant => (
                                    <RestaurantCard key={restaurant.id} data={restaurant} />
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center text-center py-20 font-merriweather opacity-80">
                                    <img src={logo} alt="Empty" className="w-24 h-24 mb-4 grayscale invert" />
                                    <h3 className="text-xl font-bold text-stone-400">No restaurants found for {queryLocation.toUpperCase()}.</h3>
                                    <p className="text-stone-500">We'll Soon reach out to restaurants in this area!</p>
                                </div>
                            )
                        }
                    </div>

                    {/* PAGINATION */}
                    {!loading && results.length > 0 && (
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                            paginate={paginate}
                            currentPage={currentPage}
                            sectionId="nearByRestaurants"
                        />
                    )}
                </>
            ) : (
                <LocationPrompt />
            )}
        </div>
    );
}
export default RestaurantPage;