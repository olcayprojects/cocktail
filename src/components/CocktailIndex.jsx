import React from "react";

const CocktailIndex = ({ alphaIndex }) => {
  const alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "J",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "Y",
    "Z",
  ];
  var num = 0;
  return (
    <>
      {alpha.map((item) => {
        return (
          <div
            className="btn-group rounded-2 mx-auto border-bottom border-4 border-info"
            role="group"
            key={num++}
            onClick={() => alphaIndex(item)}
          >
            <button
              type="button"
              className="btn btn-outline-info btn-lg fw-bold text-light"
            >
              {item}
            </button>
          </div>
        );
      })}
    </>
  );
};
export default CocktailIndex;
