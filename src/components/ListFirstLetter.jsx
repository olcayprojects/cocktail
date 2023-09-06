import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import CocktailIndex from "./CocktailIndex.jsx";

const ListFirstLetter = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  const [url, setUrl] = useState(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" +
      randomCharacter +
      ""
  );

  const setIndex = (alpha) => {
    setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alpha}`);
  };

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
      <div className="indexContainer">
        <CocktailIndex alphaIndex={(alpa) => setIndex(alpa)} />
      </div>

      <h1 className="text-center text-warning bg-black">List First Letter</h1>
      <div className="row row-cols-1 row-cols-md-3 justify-content-md-center">
        {data?.map((cocktail) => (
          <div key={cocktail.idDrink} className="col p-2">
            <div className="card h-100 pt-2">
              <img className="card-img-top img-thumbnail" src={cocktail.strDrinkThumb+"/preview"} alt="" />
              {/* <img className="card-img-top" src="test.jpeg" alt="" /> */}
              <div className="card-body">
              <div className="card-img-overlay">
                <h2 className="card-title text-center text-info bg-black opacity-75">
                  {cocktail.strDrink}
                </h2>
                </div>

                <h6 className="card-title text-warning">Tags: {cocktail.strTags}</h6>
                <h6 className="card-title text-warning">Category: {cocktail.strCategory}</h6>
                <h6 className="card-title text-warning">IBA: {cocktail.strIBA}</h6>
                <h6 className="card-title text-warning">
                  Alcoholic: {cocktail.strAlcoholic}
                </h6>
                <h6 className="card-title text-warning">Glass: {cocktail.strGlass}</h6>
                <hr />
                <h6 className="card-title text-info text-center fw-bold">Ingredient</h6>

                <ul className="list-group">
                  {[...Array(15)].map((x, i) =>
                    cocktail["strIngredient" + (i + 1)] ? (
                      <li key={i} className="list-group-item  text-success">
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
                <div className="card-footer">
                  <h6 className="text-center bg-black">EN</h6>
                  <span className="card-text text-center fs-6">
                    {cocktail.strInstructions}
                  </span>
                  <hr />
                  <h6 className="text-center bg-black">DE</h6>

                  <span className="card-text text-center fs-6">
                    {cocktail.strInstructionsDE}
                  </span>
                  <hr />
                  <h6 className="text-center bg-black">FR</h6>
                  <span className="card-text text-center fs-6">
                    {cocktail.strInstructionsIT}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFirstLetter;
