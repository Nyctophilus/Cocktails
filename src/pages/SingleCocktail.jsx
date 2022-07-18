import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  const fetchCock = async () => {
    try {
      const res = await fetch(`${url}${id}`);
      const cock = await res.json();

      if (cock.drinks) {
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1: ingd1,
          strIngredient2: ingd2,
          strIngredient3: ingd3,
          strIngredient4: ingd4,
          strIngredient5: ingd5,
          strIngredient6: ingd6,
        } = cock.drinks[0];

        const ingredients = [
          ingd1,
          ingd2,
          ingd3,
          ingd4,
          ingd5,
          ingd6,
        ];

        const newCocktail = {
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        };

        setCocktail(newCocktail);
      } else {
        setCocktail(null);
      }
      setLoading(false);
      return cock;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetchCock();
  }, [id]);

  if (loading) return <Loading />;

  if (!cocktail)
    return (
      <h2 className="section-title">
        no cocktail to display
      </h2>
    );

  const {
    name,
    image,
    info,
    category,
    glass,
    instructions,
    ingredients,
  } = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">
              instructions :
            </span>
            {instructions}
          </p>

          <p>
            <span className="drink-data">
              ingredients :
            </span>
            {ingredients.map((ing, index) =>
              ing ? <span key={index}>{ing}</span> : null
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
