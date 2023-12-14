import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Ingredient = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  const { ingredient } = useParams();

  const [url, setUrl] = useState(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  // let navigate = useNavigate();

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
  }, [url]);

  useEffect(() => {
    fetchCocktail();
  }, [fetchCocktail]);

  if (loading) {
    return <h2 className="text-center text-danger">Loading....</h2>;
  }

  return (
    <div className="container-fluid m-2 bg-black">
      <Menu />

      <img
        className="rounded mx-auto d-block bg-black"
        src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
        alt=""
      />
      <h1 className="text-center text-light bg-black">
        {ingredient} ingredient List
      </h1>

      <div className="row row-cols-1 row-cols-md-auto justify-content-md-center">
        {data?.map((cocktail) => (
          <div key={cocktail.idDrink} className="col p-1">
            <div
              className="card h-100 cp"
              onClick={() => {
                navigate(`/Details/${cocktail.idDrink}`);
              }}
            >
              <img
                className="card-img-top img-thumbnail"
                 src={cocktail.strDrinkThumb + "/preview"}
                //src="/test.jpeg"
                alt=""
              />
              <div className="card-body p-0">
                <div className="card-img-overlay">
                  <h6 className="card-title text-center text-light bg-black opacity-75 border rounded-2">
                    {cocktail.strDrink}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredient;
