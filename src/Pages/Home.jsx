import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import imgHero from "../assets/fork-hero.jpg";
import Pagination from "../components/Pagination";
import RestaurantMap from "../components/RestaurantMap";
import SearchBar from "../components/SearchBar";
import NearbyRestaurants from "../components/NearbyRestaurants";
import Restaurants from "../components/Restaurants";
import { TailSpin } from "react-loader-spinner";
import "../styles/Home.css";

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
      console.log(response.data.restaurants.data);
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
      {/* on affiche les restaurants à proximité si le user n'a pas fait de recherches */}
      {!showMap && !searchTerm && <NearbyRestaurants />}
      <section className="results-map-container">
        <div className="results-container">
          {isLoading ? (
            <div className="loader">
              <TailSpin
                height="200"
                width="200"
                color="#00645a"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            </div>
          ) : (
            <div className="restaurant container">
              {results.map((result) => (
                <Restaurants
                  key={result.id}
                  result={result}
                  showMap={showMap}
                />
              ))}
            </div>
          )}
        </div>
        <div className="map-container">
          {showMap && (
            <RestaurantMap
              results={results}
              height="900px"
              width="400px"
              // selectedResetaurant={restaurantData}
            />
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
