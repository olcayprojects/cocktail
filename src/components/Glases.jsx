import React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";


const Glases = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list";

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
    <div className="bg-black container-fluid">
      <Menu />
      <h1 className="text-center">Glass</h1>
      {data.map((cocktail,index) => (
          <span className="text-center btn btn-success m-2" key={index}
          onClick={() => {
            navigate(`/Glass/${encodeURIComponent(cocktail.strGlass)}`);
          }}>
            {cocktail.strGlass}
          </span>
      ))}
    </div>
  );
};

export default Glases;
