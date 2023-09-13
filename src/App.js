import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Random from "./components/Random.jsx";
import ListFirstLetter from "./components/ListFirstLetter.jsx";
import Categories from "./components/Categories.jsx";
import Glases from "./components/Glases.jsx";
import Ingredients from "./components/Ingredients.jsx";
import Alcoholic from "./components/Alcoholic.jsx";
import Category from "./components/Category.jsx";
import Glass from "./components/Glass.jsx";
import Ingredient from "./components/Ingredient.jsx";



import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListFirstLetter />} />
        <Route path="/Category/:Cate" element={<Category  />} />
        <Route path="/Glass/:glass" element={<Glass  />} />
        <Route path="/Ingredient/:ingredient" element={<Ingredient  />} />
      </Routes>
    </Router>
  );
}

export default App;
