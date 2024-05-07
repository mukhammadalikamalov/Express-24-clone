import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import ButtonAppBar from './Header';
import './Restaurants.css'; // Import CSS file for styling

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('https://api.express24.uz/client/v5/catalog/stores', {
                    params: {
                        latitude: 41.311191,
                        longitude: 69.279776,
                        limit: 25,
                        rootCategoryId: 2
                    }
                });
                console.log('API response:', response.data); // Log the response data
                setRestaurants(response.data.list || []); // Access the list array
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="restaurants-container">
            <ButtonAppBar />

            <h2>Restaurants</h2>
            <div className="restaurants-grid">
                {restaurants.map(restaurant => (
                    <div className="restaurant-card" key={restaurant.id}>
                        <div className="restaurant-images">
                            {restaurant.cover && <img className="restaurant-cover" src={restaurant.cover} alt="Cover" />}
                            {restaurant.logo && <img className="restaurant-logo" src={restaurant.logo} alt="Logo" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />}
                        </div>
                        <div className="restaurant-info">
                            <div className="restaurant-name">{restaurant.name}</div>
                            <NavLink to={`/restaurants/${restaurant.id}`} className="restaurant-more">More</NavLink> {/* Corrected NavLink */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Restaurants;
