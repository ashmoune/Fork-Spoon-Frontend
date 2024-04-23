import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      if (!id) {
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
        setIsLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!restaurant) {
    return null;
  }

  return (
    <div>
      <div>
        <h3>{restaurant.data.restaurant.name}</h3>
        <p>{restaurant.data.restaurant.servesCuisine}</p>
        <p>
          {restaurant.data.restaurant.address.street},
          {restaurant.data.restaurant.address.zipCode},
          {restaurant.data.restaurant.address.locality},
        </p>
        <p>{restaurant.data.restaurant.phone}</p>
        <p>{restaurant.data.restaurant.averagePrice} €</p>
        <p>{restaurant.data.restaurant.chefName}</p>
        <p>{restaurant.data.restaurant.additionalProperty.transport}</p>
        <p>{restaurant.data.restaurant.additionalProperty.parking}</p>
      </div>
      <div className="restaurant-container">
        {restaurant.data.restaurant.photos.map((photo) => {
          return (
            <div key={photo.src}>
              <img src={photo.src} alt={restaurant.data.restaurant.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RestaurantDetails;
