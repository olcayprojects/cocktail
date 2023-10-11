import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import CocktailIndex from "./CocktailIndex.jsx";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu.jsx";

const ListFirstLetter = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];

  const [url, setUrl] = useState(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=y"
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
    return (
      <h1 className="text-center text-black justify-content-md-center">
        Loading....
      </h1>
    );
  }

  return (
    <div className="container-fluid m-1 bg-black">
      <Menu />
      <div className="m-1 bg-black">
        <h6 className="text-center text-secondary bg-black">
          TheCocktailDB free JSON API
        </h6>
        <div className="container-fluid text-center">
          <CocktailIndex alphaIndex={(alpa) => setIndex(alpa)} />
        </div>

        <h1 className="text-center text-light">List First Letter</h1>
        <div className="table-responsive row row-cols-1 row-cols-md-3 justify-content-md-center">
          <table className="table table-dark table-striped table-bordered">
            <thead className="" style={{}}>
              <tr className="text-center override">
                <th></th>
                <th>Drink</th>
                <th>Tags</th>
                <th>Category</th>
                <th>IBA</th>
                <th>Alcoholic?</th>
                <th>Glass</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((cocktail) => (
                <tr key={cocktail.idDrink} className="align-middle">
                  <td>
                    <img
                      src={cocktail.strDrinkThumb}
                      className="img-fluid object-fit-fill w-100"
                      style={{ height: "50px" }}
                      alt=""
                      srcSet=""
                    />
                  </td>
                  <td
                    className="cp align-middle"
                    onClick={() => {
                      navigate(`/Details/${cocktail.idDrink}`);
                    }}
                  >
                    {cocktail.strDrink}
                  </td>
                  <td>{cocktail.strTags}</td>
                  <td>{cocktail.strCategory}</td>
                  <td>{cocktail.strIBA}</td>
                  <td>{cocktail.strAlcoholic}</td>
                  <td>{cocktail.strGlass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListFirstLetter;
