import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Glass = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { glass } = useParams();

  const [url, setUrl] = useState(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glass}`
  );

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
    <div className="container-fluid m-2 bg-black">
      <h6 className="text-center text-light bg-black">
        TheCocktailDB free JSON API
      </h6>

      <h1 className="text-center text-light bg-black">{Glass} List</h1>
      <div className="row row-cols-1 row-cols-md-4 justify-content-md-center">
        {data?.map((cocktail) => (
          <div key={cocktail.idDrink} className="col p-1">
            <div className="card h-100">
              <img
                className="card-img-top img-thumbnail"
                // src={cocktail.strDrinkThumb + "/preview"}
                src="/test.jpeg"
                alt=""
              />
              <div className="card-body">
                <div className="card-img-overlay">
                  <h3 className="card-title text-center text-info bg-dark opacity-75 border rounded-2">
                    {cocktail.strDrink}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glass;
