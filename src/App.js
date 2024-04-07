// import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListFirstLetter from "./components/ListFirstLetter.jsx";
import Category from "./components/Category.jsx";
import Glass from "./components/Glass.jsx";
import Ingredient from "./components/Ingredient.jsx";
import Details from "./components/Details.jsx";

import "./App.css";
import Random from "./components/Random.jsx";
import Categories from "./components/Categories.jsx";
import Glases from "./components/Glases.jsx";
import Ingredients from "./components/Ingredients.jsx";
// import Alcoholic from "./components/Alcoholic.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<ListFirstLetter />} />
      <Route path="/Details/:id" element={<Details />} />
      <Route path="/Category/:Cate" element={<Category />} />
      <Route path="/Glass/:glass" element={<Glass />} />
      <Route path="/Ingredient/:ingredient" element={<Ingredient />} />
      <Route path="/Categories" element={<Categories />} />
      <Route path="/Glases" element={<Glases />} />
      <Route path="/Ingredients" element={<Ingredients />} />
      <Route path="/Random" element={<Random />} />
    </Routes>
  );
}

export default App;
