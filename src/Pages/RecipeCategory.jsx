import React, { useState, useEffect, useCallback } from "react";
import "./CSS/RecipeCategory.css";
import { Link } from "react-router-dom";
import localRecipes from "../Components/Assets/localRecipes.json"; // Updated path to localRecipes.json

const RecipeCategory = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const fetchCategoryRecipes = useCallback(async () => {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${category}&number=10&addRecipeInformation=true&apiKey=${apiKey}`;
    try {
      setLoading(true);

      // Fetch local recipes and filter by category
      const filteredLocalRecipes = localRecipes
        .filter((localRecipe) => localRecipe.category === category)
        .map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: require(`../Components/Assets/${recipe.image}`), // Updated path for local images
          shortDescription: recipe.shortDescription,
          cookingTime: recipe.cookingTime,
          local: true,
        }));

      // Fetch recipes from API
      const response = await fetch(apiUrl);
      const apiData = await response.json();

      const apiRecipes = apiData.results
      .filter((recipe) => recipe.image && recipe.image.startsWith("http"))
      .map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        shortDescription: recipe.summary
          ? recipe.summary.replace(/<[^>]*>/g, "").slice(0, 100) + "..."
          : "A delicious recipe to try out!",
        cookingTime: recipe.readyInMinutes
          ? `${recipe.readyInMinutes} mins`
          : "N/A",
      }));

      const combinedRecipes = [...apiRecipes, ...filteredLocalRecipes];
      setRecipes(combinedRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, [category, apiKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategoryRecipes();
  }, [fetchCategoryRecipes]);

  return (
    <div className="recipe-category-container">
      <div className="left-background">
        <img
          src={require("../Components/Assets/Background_left.png")} // Updated path for the background image
          alt="Left Background"
        />
      </div>
      <div className="right-background">
        <img
          src={require("../Components/Assets/Background_right.png")} // Updated path for the background image
          alt="Right Background"
        />
      </div>
      <div className="content">
        <h1>Popular {category} Recipes</h1>
        {loading ? (
          <p>Loading recipes...</p>
        ) : (
          <div className="recipe-container">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/recipe/${recipe.id}`}
                  className="recipe-card"
                  key={recipe.id}
                  state={{ isLocal: !!recipe.local }}
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="recipe-image"
                  />
                  <h2 className="recipe-title">{recipe.title}</h2>
                  <p className="recipe-description">{recipe.shortDescription}</p>
                  <p>Cooking Time: {recipe.cookingTime}</p>
                </Link>
              ))
            ) : (
              <p>No recipes found for this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCategory;
