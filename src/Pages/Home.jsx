import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import imgHero from "../assets/fork-hero.jpg";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import RestaurantMap from "../components/RestaurantMap";
import SearchBar from "../components/SearchBar";
import NearbyRestaurants from "../components/NearbyRestaurants";

const Home = () => {
  // creation des states
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // on utilise useCallback pour éviter le warning eslint sur le tab de dépendance
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

  // on utilise useEffect pour appeler handleSearch à chaque changement de searchTerm ou pageNum
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Mise à jour de pageNum
  const handlePageChange = (newPageNumber) => {
    setPageNum(newPageNumber);
    handleSearch();
  };

  // Mise à jour de la recherche
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
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchButtonClick={handleSearchButtonClick}
        />
      </section>
      {!showMap && !searchTerm && <NearbyRestaurants />}
      <section className="results-map-container">
        <div className="results-container">
          {isLoading ? (
            <p>Loading..please wait</p>
          ) : (
            <div className="restaurant container">
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
                        <div>
                          {result.aggregateRatings.thefork.ratingValue}/ 10
                        </div>
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
          {showMap && (
            <RestaurantMap results={results} height="900px" width="400px" />
          )}
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
