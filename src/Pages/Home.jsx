import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import imgHero from "../assets/fork-hero.jpg";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import RestaurantMap from "../components/RestaurantMap";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/locations`, {
        params: {
          text: searchTerm,
          pageNumber: pageNum,
        },
      });
      setResults(response.data.restaurants.data);
      setShowMap(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, pageNum]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handlePageChange = (newPageNumber) => {
    setPageNum(newPageNumber);
    handleSearch();
  };

  const handleSearchButtonClick = () => {
    setPageNum(1);
    handleSearch();
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
          <span>
            <button onClick={handleSearchButtonClick}>RECHERCHE</button>
          </span>
        </div>
      </section>
      <section className="results-map-container">
        <div className="results-container">
          {isLoading ? (
            <p>Loading..please wait</p>
          ) : (
            <div className="restaurant">
              {results.map((result) => (
                <Link
                  key={result.id}
                  to={{
                    pathname: `/restaurants/${result.id}`,
                    state: { restaurant: result },
                  }}
                >
                  <div className="restaurant-container">
                    <section className="left-part">
                      <div className="restaurant-picture">
                        <img src={result.mainPhoto.source} alt="" />
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
                        </div>
                        <div>Prix moyen {result.priceRange} €</div>
                      </div>
                      <div className="ratings">
                        <div>{result.aggregateRatings.thefork.ratingValue}</div>
                        <div>{result.aggregateRatings.thefork.reviewCount}</div>
                      </div>
                    </section>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="map-container">
          {showMap && <RestaurantMap results={results} />}
        </div>
      </section>
      <Pagination
        pageNum={pageNum}
        setPageNum={setPageNum}
        onPageChange={handlePageChange}
      />
    </main>
  );
};
export default Home;
