import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Home from "./Pages/Home";

// import des components
import Header from "./components/Header";
import RestaurantsDetails from "./Pages/RestaurantsDetails";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantsDetails />}
          ></Route>
          {/* <Route></Route>
      <Route></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
