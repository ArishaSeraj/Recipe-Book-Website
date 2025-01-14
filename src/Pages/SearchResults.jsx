import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import localRecipes from "../Components/Assets/localRecipes.json"; // Adjust path as needed
import "./CSS/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        
        // Search local recipes
        const filteredLocalRecipes = localRecipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
          .map((recipe) => ({
              ...recipe,
              local: true,
            }));

        // Search recipes from API
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=10&addRecipeInformation=true&apiKey=${apiKey}`;
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
          local: false,  
        }));

        const combinedRecipes = [...filteredLocalRecipes, ...apiRecipes];
        setRecipes(combinedRecipes);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchRecipes();
    }
  }, [searchQuery, apiKey]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{searchQuery}"</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipes-container">
          {recipes.map((recipe) => {
            const recipeImage = 
              recipe.image && !recipe.image.startsWith("http")
                ? require(`../Components/Assets/${recipe.image}`)
                : recipe.image;

          return (
            <div key={recipe.id} className="recipe-card">
              <Link
                style={{ textDecoration: 'none', color: 'black'}} 
                to={`/recipe/${recipe.id}`}
                className="recipe-card" 
                state={{ isLocal: recipe.local }}> 
              <img src={recipeImage} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>{recipe.shortDescription}</p>
              <p>Cooking Time: {recipe.cookingTime}</p>
              </Link>
            
          </div>
          );    
        })}
      </div>
    ) : (
        <p>No recipes found for your search query.</p>
      )}
    </div>
  );
};

export default SearchResults;
