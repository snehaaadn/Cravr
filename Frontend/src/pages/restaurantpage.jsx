import react, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRestaurantsByLocationName } from '../services/api.js';
import Loading from '../components/common/loading.jsx';
import RestaurantCard from '../components/restaurantCard.jsx';
import Pagination from '../components/common/pagination.jsx';
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
                // Pass currentPage and itemsPerPage to the API
                const response = await getRestaurantsByLocationName(location, currentPage, itemsPerPage);

                const rawData = response.data.restaurants || [];
                // Assuming your backend sends the total count of matches for pagination
                setTotalItems(response.data.totalCount || rawData.length);

                const data = rawData.map(item => ({
                    id: item._id,
                    name: item.name,
                    image: logo,
                    location: item.address?.city || item.address?.locality || "Local Area",
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
        <div id='nearByRestaurants' className="min-h-screen bg-stone-900 py-10 px-5 scroll-mt-20">
            <h1 className="text-3xl font-bold text-white mb-8">Restaurants in {queryLocation || 'Bengaluru'}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {results.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} data={restaurant} />
                ))}
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
        </div>
    );
}
export default RestaurantPage;