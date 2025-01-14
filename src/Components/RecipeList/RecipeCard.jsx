import React from "react";


const RecipeCard = ({ title, image, shortDescription, cookingTime }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-card-image" />
      <h3 className="recipe-card-title">{title}</h3>
      <p className="recipe-card-description">{shortDescription}</p>
      <p className="recipe-card-time">Cooking Time: {cookingTime}</p>
    </div>
  );
};

export default RecipeCard;
