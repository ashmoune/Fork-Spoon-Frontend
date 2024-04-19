import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RestaurantMap = ({ results }) => {
  useEffect(() => {
    const map = L.map("map").setView([48.8566, 2.3522], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    if (results && results.length > 0) {
      const firstRestaurant = results[0];
      const { latitude, longitude } = firstRestaurant.geo;
      map.setView([latitude, longitude], 13);
      results.forEach((restaurant) => {
        const marker = L.marker([
          restaurant.geo.latitude,
          restaurant.geo.longitude,
        ]).addTo(map);
        marker.bindPopup(restaurant.name);
      });
    }

    return () => {
      map.remove();
    };
  }, [results]);

  return <div id="map" style={{ height: "900px", width: "400px" }} />;
};

export default RestaurantMap;
