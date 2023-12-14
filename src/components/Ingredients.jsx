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
    <div className="bg-black">
      <Menu />
      <h1 className="text-center">Ingredients </h1>
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-6 justify-content-md-center">
          {data.map((cocktail, index) => (
            <div className="col p-1" key={index}>
              <div
                className="card cp"
                onClick={() => {
                  navigate(`/Ingredient/${cocktail["strIngredient1"]}`);
                }}
              >
                <img
                  className="card-img-top img-thumbnail"
                  src={`https://www.thecocktaildb.com/images/ingredients/${cocktail["strIngredient1"]}-Small.png`}
                  alt=""
                />
                <div className="card-body p-0">
                  <div className="card-img-overlay">
                    <h6 className="card-title text-center text-light bg-black opacity-75 border rounded-2">
                      {cocktail.strIngredient1}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
