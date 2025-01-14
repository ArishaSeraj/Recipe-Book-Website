import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./CSS/RecipeDetails.css"; // Updated path for CSS

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const { state } = useLocation(); // Access the state passed from the Link
  const { isLocal } = state || {}; // Determine if the recipe is local
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);

        if (isLocal) {
          // Fetch localRecipes.json from the Components folder
          const localRecipes = require("../Components/Assets/localRecipes.json"); // Updated path to localRecipes.json

          // Find the recipe in the local recipes JSON
          const localRecipe = localRecipes.find(
            (recipe) => recipe.id.toString() === id
          );
          setRecipeDetails(localRecipe);
        } else {
          // Fetch the recipe details from the API
          const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setRecipeDetails(data);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, isLocal, apiKey]);

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (!recipeDetails) {
    return <p>Recipe details not available!</p>;
  }

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipeDetails.title}</h1>
      <img
        src={
          isLocal
            ? require(`../Components/Assets/${recipeDetails.image}`)
            : recipeDetails.image
        } // Updated path for local recipe images
        alt={recipeDetails.title}
        className="recipe-image"
      />
      <div className="recipe-info">
        <p>
          <strong>Cooking Time:</strong>{" "}
          {recipeDetails.cookingTime || recipeDetails.readyInMinutes + " mins"}
        </p>
        <p>
          <strong>Servings:</strong>{" "}
          {recipeDetails.servings || "Not available"}
        </p>
        {isLocal && (
          <p>
            <strong>Category:</strong> {recipeDetails.category}
          </p>
        )}
      </div>
      <div className="recipe-ingredients">
        <h2>Ingredients:</h2>
        <ul>
          {isLocal ? (
            recipeDetails.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            recipeDetails.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))
          )}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h2>Instructions:</h2>
        <p>{recipeDetails.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
