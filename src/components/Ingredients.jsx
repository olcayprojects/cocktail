import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";


const Ingredients = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";

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
      <Menu />
      <h1 className="text-center">Ingredients </h1>
      <div className="container">
      {data.map((cocktail,index) => (
          <span className="btn btn-info m-2" key={index}
          onClick={() => {
            navigate(
              `/Ingredient/${cocktail["strIngredient1"]}`
            );
          }}
          >
            {cocktail.strIngredient1}
          </span>
      ))}
      </div>
    </div>
  );
};

export default Ingredients;
