import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const Glases = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";

  const fetchCocktail = useCallback(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data.drinks);
        setData(res.data.drinks);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  if (loading) {
    return <h2 className="text-center text-danger">Loading....</h2>;
  }

  return (
    <div>
      <h1 className="text-center">Glass</h1>
      {data.map((cocktail) => (
        <div className="container" key={cocktail.idDrink}>
          <h5 className="text-center text-info bg-black">
            {cocktail.strGlass}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default Glases;
