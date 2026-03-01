import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, suggestions = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title);
        onSearch(suggestion.title);
        setShowSuggestions(false);
    };

    const filteredSuggestions = searchTerm.trim()
        ? suggestions.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
        : [];

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Rechercher des films, séries..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                        onSearch(e.target.value); // dynamic search
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    🔍
                </button>
            </form>

            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item"
                        >
                            {suggestion.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
