import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function Random() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

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
    <div className="App m-2">
      {data.map((cocktail) => (
        <div className="container" key={cocktail.idDrink}>
          <h1 className="text-center text-warning bg-black">Random Cocktail</h1>

          <img
            className="img-thumbnail mx-auto d-block m-1"
            // src={cocktail.strDrinkThumb + "/preview"}
            src="test.jpeg"
            alt=""
          />
          <h2 className="text-center text-info bg-black">
            {cocktail.strDrink}
          </h2>
          <ul className="list-group list-group-flush">
            {[...Array(15)].map((x, i) =>
              cocktail["strIngredient" + (i + 1)] ? (
                <li className="list-group-item">
                  {(cocktail["strMeasure" + (i + 1)] !== "null"
                    ? cocktail["strMeasure" + (i + 1)]
                    : "") +
                    " " +
                    cocktail["strIngredient" + (i + 1)]}
                </li>
              ) : (
                ""
              )
            )}
          </ul>
          <hr />
          <span className="text-center fs-6">{cocktail.strInstructions}</span>

          <div className="d-grid gap-2 col-6 mx-auto bg-black">
            <button className="btn btn-outline-primary" onClick={fetchCocktail}>
              Change Cocktail
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Random;
