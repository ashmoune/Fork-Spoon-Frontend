import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RestaurantMap from "../components/RestaurantMap";

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
      <div className="restaurant-container container">
        {restaurant.data.restaurant.photos.map((photo) => {
          return (
            <div className="details-restaurant-picture" key={photo.src}>
              <img src={photo.src} alt={restaurant.data.restaurant.name} />
            </div>
          );
        })}
      </div>
      <div className="restaurant-details-info">
        <div className="resto-details-info-left">
          <h2>{restaurantData.name}</h2>
          <p>
            <FontAwesomeIcon icon="utensils" />
            {restaurantData.servesCuisine}
          </p>
          <p>
            <FontAwesomeIcon icon="location-pin" />
            {restaurantData.address.street},{restaurantData.address.zipCode},
            {restaurantData.address.locality},
          </p>
          <p>{restaurantData.phone}</p>
          <p>
            <FontAwesomeIcon icon="money-bill" />
            {restaurantData.averagePrice} €
          </p>
          <p>
            <FontAwesomeIcon icon="chess-rook" /> Chef {restaurantData.chefName}
          </p>
          <p>
            <FontAwesomeIcon icon="train-subway" />
            {restaurantData.additionalProperty.transport}
          </p>
          <p>
            <FontAwesomeIcon icon="square-parking" />
            {restaurantData.additionalProperty.parking}
          </p>
        </div>

        <div className="comment">
          <FontAwesomeIcon icon="comment" />
          <p>{restaurantData.aggregateRatings.thefork.reviewCount} avis</p>
        </div>
        <div className="resto-details-map">
          <RestaurantMap height="300px" width="100%" />
        </div>
      </div>
      <Reviews />
    </div>
  );
};
export default RestaurantDetails;
