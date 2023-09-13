import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import CocktailIndex from "./CocktailIndex.jsx";
import { useNavigate } from "react-router-dom";

const ListFirstLetter = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  const [url, setUrl] = useState(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + "y" + ""
  );

  const setIndex = (alpha) => {
    setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alpha}`);
  };

  let navigate = useNavigate();

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
    <div className="container-fluid m-1 bg-black">
      <h6 className="text-center text-light bg-black">
        TheCocktailDB free JSON API
      </h6>
      <div className="d-flex">
        <CocktailIndex alphaIndex={(alpa) => setIndex(alpa)} />
      </div>

      <h1 className="text-center text-light bg-black">List First Letter</h1>
      <div className="row row-cols-1 row-cols-md-3 justify-content-md-center">
        {data?.map((cocktail) => (
          <div key={cocktail.idDrink} className="col">
            <div className="card h-100">
              <img
                className="card-img-top img-thumbnail"
                // src={cocktail.strDrinkThumb + "/preview"}
                src="test.jpeg"
                alt=""
              />
              <div className="card-body">
                <div className="card-img-overlay">
                  <h2 className="card-title text-center text-info bg-dark opacity-75 border rounded-2">
                    {cocktail.strDrink}
                  </h2>{" "}
                  {cocktail.strTags ? (
                    <span className="card-title text-light bg-dark opacity-75 px-1">
                      <span className="text-danger">Tags: </span>
                      {cocktail.strTags}
                    </span>
                  ) : (
                    ""
                  )}
                  <br />
                  <span
                    className="card-title text-light bg-dark opacity-75 px-1"
                    onClick={() => {
                      navigate(`/Category/${cocktail.strCategory}`);
                    }}
                  >
                    <span className="text-danger">Category: </span>
                    {cocktail.strCategory}
                  </span>
                  <br />
                  {cocktail.strIBA ? (
                    <span className="card-title text-light bg-dark opacity-75 px-1">
                      <span className="text-danger">IBA: </span>
                      {cocktail.strIBA}
                    </span>
                  ) : (
                    ""
                  )}
                  <br />
                  <span className="card-title text-light bg-dark opacity-75 px-1">
                    <span className="text-danger">Alcoholic: </span>
                    {cocktail.strAlcoholic}
                  </span>
                  <br />
                  <span
                    className="card-title text-light bg-dark opacity-75 px-1"
                    onClick={() => {
                      navigate(`/Glass/${cocktail.strGlass}`);
                    }}
                  >
                    <span className="text-danger">Glass: </span>
                    {cocktail.strGlass}
                  </span>
                </div>

                <h5 className="card-title text-info text-center fw-bold text-decoration-underline text-uppercase">
                  Ingredients
                </h5>

                <ul className="list-group list-group-horizontal text-center flex-wrap justify-content-md-center fst-italic">
                  {[...Array(15)].map((x, i) =>
                    cocktail["strIngredient" + (i + 1)] ? (
                      <li
                        key={i}
                        className="border border-black p-0 mb-1 list-group-item text-black fw-bold bg-secondary"
                      >
                        <img
                          className="img-fluid bg-black"
                          src={`https://www.thecocktaildb.com/images/ingredients/${
                            cocktail["strIngredient" + (i + 1)]
                          }-Small.png`}
                          alt=""
                        />
                        <br />
                        {cocktail["strMeasure" + (i + 1)] !== null
                          ? cocktail["strMeasure" + (i + 1)]
                          : ""}
                        <span
                          onClick={() => {
                            navigate(
                              `/Ingredient/${
                                cocktail["strIngredient" + (i + 1)]
                              }`
                            );
                          }}
                        >
                          {" "}
                          {cocktail["strIngredient" + (i + 1)]}
                        </span>
                      </li>
                    ) : (
                      ""
                    )
                  )}
                </ul>
                <div className="card-footer">
                  <h5 className="card-title text-info text-center fw-bold text-decoration-underline text-uppercase">
                    Instructions
                  </h5>
                  <h6 className="text-center bg-black">EN</h6>
                  <span className="card-text text-center">
                    {cocktail?.strInstructions}
                  </span>
                  <hr />
                  <h6 className="text-center bg-black">DE</h6>

                  <span className="card-text text-center fs-6">
                    {cocktail?.strInstructionsDE}
                  </span>
                  <hr />
                  <h6 className="text-center bg-black">IT</h6>
                  <span className="card-text text-center fs-6">
                    {cocktail?.strInstructionsIT}
                  </span>
                  <hr />
                  <span className="card-text fw-light text-center">
                    Date Modified: {cocktail.dateModified}
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
