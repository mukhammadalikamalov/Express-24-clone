import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantById = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

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
            {restaurant ? (
                <div>
                    <p>Name: {restaurant.name}</p>
                    <p>ID: {restaurant.id}</p>
                    <h2>Products</h2>
                    <div className="product-cards">
                        {restaurant.products.map(product => (
                            <div className="product-card" key={product.id}>
                                <p>Title: {product.title}</p>
                                <p>Category: {product.category}</p>
                                <p>Price: {product.price}</p>
                                {/* Render other product details as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RestaurantById;
