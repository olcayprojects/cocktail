import { useState, useCallback, useEffect } from "react";
import Random from "./components/Random.jsx";
import ListFirstLetter from "./components/ListFirstLetter.jsx";
import Categories from "./components/Categories.jsx";
import Glases from "./components/Glases.jsx";
import Ingredients from "./components/Ingredients.jsx";
import Alcoholic from "./components/Alcoholic.jsx";

import "./App.css";

function App() {
  return (
    <div>
      {/* <Alcoholic />
      <Ingredients />
      <Glases />
      <Categories /> */}
      <ListFirstLetter />
      {/* <Random /> */}
    </div>
  );
}

export default App;
