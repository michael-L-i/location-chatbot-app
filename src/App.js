import React, { useState } from 'react';
import Title from './components/Title';
import SuggestionCard from './components/SuggestionCard';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();  
    setError(null);  
    setQuery('');  // Clear the input field after submission

    try {
      // Send the query to the Flask backend via a POST request
      const response = await fetch('https://location-app-michael-li-f0771375ba74.herokuapp.com/chat', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();  

      // formats suggestions to be put in each SuggestionsCard
      const formattedSuggestions = data.name.map((name, index) => ({
        name: name,
        image: data.images[index] || '', 
        description: data.description[index] || ''
      }));

      setSuggestions(formattedSuggestions);

    } catch (error) {
      console.error("Error during fetch:", error);
      setError('There was an issue fetching the suggestions.');
    }
  };

  return (
    <div>
      <Title text="Location Chatbot" />

      <div className="body_content">
        <form className="search_bar" onSubmit={handleSubmit}>
          <input
            className="search_input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask for places to visit"
          />
          <button className="search_button" type="submit">Submit</button>
        </form>
        
          <div className="suggestions-container">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard
              key={index}
              name={suggestion.name}
              image={suggestion.image}
              description={suggestion.description}
            />
          ))}
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
