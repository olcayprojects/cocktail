import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

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
      <Menu />
      {data.map((cocktail) => (
        <div className="container" key={cocktail.idDrink}>
          <h1 className="text-center text-warning bg-black">Random Cocktail</h1>

          <img
            className="img-thumbnail mx-auto d-block m-1"
            src={cocktail.strDrinkThumb + ""}
            //src="test.jpeg"
            alt=""
          />
          <h2 className="text-center text-info bg-black">
            {cocktail.strDrink}
          </h2>
          <ListGroup as="ol" horizontal>
            {[...Array(15)].map((x, i) =>
              cocktail["strIngredient" + (i + 1)] ? (
                <ListGroup.Item as="li" variant="info" key={i}>
                  <img
                  className="rounded mx-auto d-block"
                    src={`https://www.thecocktaildb.com/images/ingredients/${
                      cocktail["strIngredient" + (i + 1)]
                    }-Small.png`}
                    alt=""
                    thumbnail
                  />
                  <h6 className="text-center">
                    {(cocktail["strMeasure" + (i + 1)] !== null
                      ? cocktail["strMeasure" + (i + 1)]
                      : "") +
                      " " +
                      cocktail["strIngredient" + (i + 1)]}
                  </h6>
                </ListGroup.Item>
              ) : (
                ""
              )
            )}
          </ListGroup>
          <hr />
          <span className="text-center fs-6">{cocktail.strInstructions}</span>
          <br />
          <div className="d-grid">
            <Button onClick={fetchCocktail} variant="outline-warning" size="lg">
              Change Cocktail
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Random;
