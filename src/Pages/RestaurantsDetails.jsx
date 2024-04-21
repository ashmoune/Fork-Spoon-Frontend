import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants/${restaurantId}`
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default RestaurantDetails;
