import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";

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

  const restaurantData = restaurant.data.restaurant;
  return (
    <div>
      <div className="restaurant-container">
        {restaurant.data.restaurant.photos.map((photo) => {
          return (
            <div key={photo.src}>
              <img src={photo.src} alt={restaurant.data.restaurant.name} />
            </div>
          );
        })}
      </div>
      <div>
        <h3>{restaurantData.name}</h3>
        <p>{restaurantData.servesCuisine}</p>
        <p>
          {restaurantData.address.street},{restaurantData.address.zipCode},
          {restaurantData.address.locality},
        </p>
        <p>{restaurantData.phone}</p>
        <p>{restaurantData.averagePrice} €</p>
        <p>{restaurantData.chefName}</p>
        <p>{restaurantData.additionalProperty.transport}</p>
        <p>{restaurantData.additionalProperty.parking}</p>
      </div>
      <Reviews />
    </div>
  );
};
export default RestaurantDetails;
