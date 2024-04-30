import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Restaurants.css";
const Restaurant = ({ result, showMap }) => {
  return (
    <Link
      key={result.id}
      to={{
        pathname: `/restaurants/${result.id}`,
        state: { restaurant: result },
      }}
    >
      <div
        className={
          showMap ? "restaurant-container" : "restaurant-container-nearby"
        }
      >
        <section className="left-part">
          <div className="restaurant-picture">
            <img src={result.mainPhoto.source} alt="" />
          </div>
        </section>
        <section className={showMap ? "right-part" : "right-part-nearby"}>
          <div
            className={showMap ? "restaurant-info" : "restaurant-info-nearby"}
          >
            <h2>{result.name}</h2>
            <div className="restaurant-style">{result.servesCuisine}</div>
            <div className="resto-address">
              <span>{result.address.street},</span>
              <span>{result.address.postalCode},</span>
              <span>{result.address.locality},</span>
            </div>
            <div>Prix moyen {result.priceRange} €</div>
          </div>
          <div className="ratings">
            <div>{result.aggregateRatings.thefork.ratingValue}/ 10</div>
            <div>
              {result.aggregateRatings.thefork.reviewCount}
              <span>
                <FontAwesomeIcon icon="fa-comment" />
              </span>
            </div>
          </div>
        </section>
      </div>
    </Link>
  );
};

export default Restaurant;
