import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationPin,
  faUtensils,
  faMoneyBill,
  faComment,
  faChessRook,
  faTrainSubway,
  faSquareParking,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Home from "./Pages/Home";
import RestaurantsDetails from "./Pages/RestaurantsDetails";

// import des components
import Header from "./components/Header";
import Footer from "./components/Footer";

library.add(
  faLocationPin,
  faUtensils,
  faMoneyBill,
  faComment,
  faChessRook,
  faTrainSubway,
  faSquareParking
);

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantsDetails />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
