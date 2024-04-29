import React, { useEffect, useState } from "react";
import axios from "axios";
import restoProx from "../assets/restopop.webp";
import Restaurants from "./Restaurants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NearbyRestaurants = () => {
  // import  des states
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [cityName, setCityName] = useState(null);

  // on récupere  la position géographique avec le navigateur
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  // on obtien le nom de la ville à partir des coordonnées grâce à l'API nominatim
  async function getCityName(latitude, longitude) {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
        },
      }
    );

    if (response.data && response.data.address) {
      const cityName =
        response.data.address.city ||
        response.data.address.town ||
        response.data.address.village;

      setCityName(cityName);
    }

    throw new Error("City not found");
  }

  // onrécupere les restaurants à proximité lorsque la position correspond
  useEffect(() => {
    if (location) {
      getCityName(location.latitude, location.longitude)
        .then((cityName) => console.log(cityName))
        .catch((error) => console.error(error));

      const fetchRestaurants = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/locations`, {
            params: {
              text: cityName,
            },
          });
          setRestaurants(response.data.restaurants.data);
          console.log(response.data.restaurants);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchRestaurants();
    }
  }, [location, cityName]);

  return (
    <div>
      <div className="restaurants-proxim container">
        <img src={restoProx} alt="restoProx" />
      </div>
      <h2> Restaurants à proximité de chez vous</h2>
      <div className="nearby-resto-parent">
        {restaurants.map((restaurant) => (
          <Restaurants key={restaurant.id} result={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurants;
