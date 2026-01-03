import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to every request
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response, // successful responses
  (error) => {
    // Check if Expired/Invalid Token
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page and refresh state
      window.location.href = '/auth'; 
    }
    return Promise.reject(error);
  }
);


// User APIs 
const userSignup = (formData) => api.post('/users/signup', formData);
const userLogin = (phone, password) => api.post('/users/login', { phone, password });
const getUserProfile = () => api.get('/users/profile');
const addAddressToUser = (addressData) => api.post('/users/address', addressData);
const deleteAddressFromUser = (addressID) => api.delete(`/users/address/${addressID}`);


// Cart APIs
const addDishToCart = (dishID, name, price, quantity) =>
  api.post('/users/cart', { dishID, name, price, quantity });

const getCart = () => api.get('/users/cart');

const removeDishFromCart = (dishID) =>
  api.delete('/users/cart', { data: { dishID } });

const updateDishQuantityInCart = (dishID, quantity) =>
  api.patch('/users/cart', { dishID, quantity });

// Order APIs
const createOrder = (orderData) => api.post('/orders/create', orderData);
const getUserOrders = () => api.get('/orders/user-orders'); 


// Restaurant APIs
const getRestaurantsByLocationName = (locationName, page = 1, limit = 10) =>
  api.get('/restaurants', {
    params: { locationName, page, limit },
  });

const getRestaurantDetailsByID = (id) =>
  api.get(`/restaurants/${id}`);

const getRestaurantsByName = (name) =>
  api.get(`/restaurants/name/${name}`);


// Dish APIs
const getDishesByName = (name, page = 1) => {
  const params = { page, limit: 12 };
  if (name) params.name = name;

  return api.get('/dishes/search', { params });
}

const getDishDetailsByID = (id) =>{
  return api.get(`/dishes/${id}`);
}


// Review APIs
const addReview = (dishID, rating, comment) => {
  return api.post('/dishes/review', { dishID, rating, comment })
};

export {
  userSignup,
  userLogin,
  getUserProfile,
  addAddressToUser,
  deleteAddressFromUser,
  addDishToCart,
  getCart,
  removeDishFromCart,
  updateDishQuantityInCart,
  createOrder,
  getUserOrders,
  getRestaurantsByLocationName,
  getRestaurantsByName,
  getRestaurantDetailsByID,
  getDishesByName,
  getDishDetailsByID,
  addReview,
};