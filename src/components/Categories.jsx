import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

  const fetchCocktail = useCallback(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
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
      <h1 className="text-center">Category</h1>
      {data.map((cocktail, index) => (
        <span
          className="text-center btn btn-danger m-2"
          key={index}
          onClick={() => {
            navigate(`/Category/${encodeURIComponent(cocktail.strCategory)}`);
          }}
        >
          {cocktail.strCategory}
        </span>
      ))}
    </div>
  );
};

export default Categories;
