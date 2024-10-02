import React from 'react';

const SuggestionCard = ({ name, image, description}) => {
  return (
    <div className="suggestion-card">
      <img src={image} alt={name} className="suggestion-image" />
      <div className="suggestion-details">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SuggestionCard;
