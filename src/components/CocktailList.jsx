import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktails } = useGlobalContext();
  console.log(cocktails);

  if (loading) return <Loading />;

  if (!cocktails.length)
    return (
      <h2 className="section-title">
        no cocktails matched your search term
      </h2>
    );

  return (
    <section className="section">
      <h2 className="section-title">Cocktails</h2>

      <div className="cocktails-center">
        {cocktails.map((cocktail) => (
          <Cocktail key={cocktail.id} {...cocktail} />
        ))}
      </div>
    </section>
  );
};

export default CocktailList;
