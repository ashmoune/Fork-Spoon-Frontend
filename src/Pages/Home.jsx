import React, { useState } from "react";
import RestaurantMap from "../components/RestaurantMap";
import axios from "axios";
import imgHero from "../assets/fork-hero.jpg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/locations?text=${searchTerm}`
      );
      setResults(response.data.restaurants.data);
      setShowMap(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container">
      <section className="hero-container">
        <div className="img-container">
          <div className="overlay-text">
            Découvrez et réservez le meilleur restaurant
          </div>

          <img src={imgHero} alt="" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            name="search"
            value={searchTerm}
            placeholder="A proximité, adresse, arrondissement"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>RECHERCHE</button>
        </div>
      </section>
      <section className="results-map-container">
        <div className="results-container">
          {isLoading ? (
            <p>Loading..please wait</p>
          ) : (
            <div className="restaurant">
              {results.map((result) => (
                <div className="restaurant-container" key={result.id}>
                  <section className="left-part">
                    <div className="restaurant-picture">
                      <img src={result.mainPhoto.source} alt="" />{" "}
                    </div>
                  </section>
                  <section className="right-part">
                    <div className="restaurant-info">
                      <h2>{result.name}</h2>
                      <div className="restaurant-style">
                        {result.servesCuisine}
                      </div>
                      <div className="resto-address">
                        <span>{result.address.street},</span>
                        <span>{result.address.postalCode},</span>
                        <span>{result.address.locality},</span>
                        {/* <span>{result.address.country}</span> */}
                      </div>

                      <div>Prix moyen {result.priceRange} €</div>
                    </div>
                    <div className="ratings">
                      <div>{result.aggregateRatings.thefork.ratingValue}</div>
                      <div>{result.aggregateRatings.thefork.reviewCount}</div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="map-container">
          {showMap && <RestaurantMap results={results} />}
        </div>
      </section>
    </main>
  );
};

export default Home;
