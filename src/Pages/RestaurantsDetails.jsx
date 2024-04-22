import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (!id) {
        setError;
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants/${id}`
        );
        console.log(response.data);
        setRestaurant(response.data.restaurant);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="restaurant-container">
        <img
          src={restaurant.data.restaurant.image}
          alt={restaurant.data.restaurant.name}
        />
        <h3>{restaurant.data.restaurant.name}</h3>
        <p>{restaurant.data.restaurant.servesCuisine}</p>
        <p>
          {restaurant.data.restaurant.address.street},
          {restaurant.data.restaurant.address.zipCode},
          {restaurant.data.restaurant.address.locality},
          {restaurant.data.restaurant.address.country}
        </p>
        <p>{restaurant.data.restaurant.priceRange} €</p>
      </div>
    </div>
  );
};

export default RestaurantDetails;
