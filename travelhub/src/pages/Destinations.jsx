import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FeaturedDestinations from "../components/FeaturedDestinations";
import { destinations } from "../components/FeaturedDestinations";
import AccessibilityFilters from "../components/AccessibilityFilters";

const categories = ["All", "Nature", "Beach", "Heritage", "Adventure", "City", "Hill"];

function Destinations(){
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedCategory = searchParams.get("category");
    const selectedCategory = categories.includes(requestedCategory) ? requestedCategory : "All";
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNeeds, setSelectedNeeds] = useState([]);
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredDestinations = destinations.filter((destination) => {
        const matchesCategory = selectedCategory === "All" || destination.categories.includes(selectedCategory);
        const matchesNeeds = selectedNeeds.every((need) => destination.accessibility.includes(need));
        const searchableText = `${destination.name} ${destination.region} ${destination.categories.join(" ")}`.toLowerCase();
        return matchesCategory && matchesNeeds && searchableText.includes(normalizedSearch);
    });
    const toggleNeed = (need) => {
        setSelectedNeeds((currentNeeds) => currentNeeds.includes(need)
            ? currentNeeds.filter((currentNeed) => currentNeed !== need)
            : [...currentNeeds, need]);
    };
    const handleCategoryChange = (category) => {
        setSearchParams(category === "All" ? {} : { category });
    };

    return(
        <main className="wrapper">         
        <section className="title">
            <div className="title-travel">
                <h1>Explore <span> Destinations</span></h1>
                <p>Discover hundreds of amazing places across India and beyond</p>
            </div>
                        <label className="destination-search">
                            <span className="visually-hidden">Search destinations, states, or cities</span>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search destinations, states, or cities..."
                            />
            </label>
            <div className="travel-where">
                <ul>
                                        {categories.map((category) => (
                                            <li key={category}>
                                                <button
                                                    type="button"
                                                    className="border"
                                                    aria-pressed={selectedCategory === category}
                                                    onClick={() => handleCategoryChange(category)}
                                                >
                                                    {category}
                                                </button>
                                            </li>
                                        ))}
                </ul>
            </div>
            <div className="accessibility-filter-section">
                <p>Filter by accessibility</p>
                <AccessibilityFilters
                    className="accessibility-filters"
                    buttonClassName="accessibility-filter-button"
                    selectedNeeds={selectedNeeds}
                    onToggle={toggleNeed}
                />
            </div>
        </section>
        <section className="home-2 destinations-featured">
            <div className="home-2-content">
                <h1>Featured Destinations</h1>
                                <p>{filteredDestinations.length} destinations to explore</p>
            </div>
                        {filteredDestinations.length > 0 ? (
                            <FeaturedDestinations items={filteredDestinations} showDetails />
                        ) : (
                            <p className="destination-empty" role="status">No destinations match your search.</p>
                        )}
        </section>
        </main>
    )
}

export default Destinations;