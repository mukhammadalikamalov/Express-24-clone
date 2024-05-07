import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantById = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState({});

    useEffect(() => {
        const fetchRestaurantById = async () => {
            try {
                const response = await axios.get(`https://api.express24.uz/client/v5/catalog/stores/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant by ID:', error);
            }
        };

        fetchRestaurantById();
    }, [id]);

    return (
        <div>
            {restaurant.name && (
                <div>
                    <p>ID: {restaurant.id}</p>
                </div>
            )}
        </div>
    );
};

export default RestaurantById;
