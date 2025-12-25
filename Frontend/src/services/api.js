import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
const userSignup = (username, email, phone, password) => api.post('/users/signup', { username, email, phone, password });
const userLogin = (phone, password) => api.post('/users/login', { phone, password });
const getUserProfile = (token) =>
  api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });


// Cart APIs
const addDishToCart = (token, dishID, name, price, quantity) =>
  api.post('/users/cart', { dishID, name, price, quantity }, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getCart = (token) =>
  api.get('/users/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });

const removeDishFromCart = (token, dishId) =>
  api.delete('/users/cart', {
    headers: { Authorization: `Bearer ${token}` },
    data: { dishId },
  });

const updateDishQuantityInCart = (token, dishId, quantity) =>
  api.patch(
    '/users/cart',
    { dishId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  
// Order APIs
const createOrder = (token, restaurantId,
        cartItems,
        subTotal,
        tax,
        deliveryFee,
        totalAmount,
        paymentMethod,
        shippingAddress,) =>
  api.post('/orders/create', { restaurantId,
        cartItems,
        subTotal,
        tax,
        deliveryFee,
        totalAmount,
        paymentMethod,
        shippingAddress, }, {
    headers: { Authorization: `Bearer ${token}` },
  });

const getUserOrders = (token) =>
  api.get('/orders/user-orders', {
    headers: { Authorization: `Bearer ${token}` },
  });


// Restaurant APIs
const getRestaurantsByLocationName = (locationName) =>
  api.get('/restaurants', {
    params: { locationName },
  });

const getRestaurantDetailsByID = (id) =>
  api.get(`/restaurants/${id}`);

const getRestaurantsByName = (name) =>
  api.get(`/restaurants/name/${name}`);


// Dish APIs
const getDishes = (name, category, page = 1) => {
  const params = {page, limit: 12};
  if (name) params.name = name;
  if (category) params.category = category;

  return api.get('/dishes/search', { params });
}

export {
  userSignup,
  userLogin,
  getUserProfile,
  addDishToCart,
  getCart,
  removeDishFromCart,
  updateDishQuantityInCart,
  createOrder,
  getUserOrders,
  getRestaurantsByLocationName,
  getRestaurantsByName,
  getRestaurantDetailsByID,
  getDishes,
};