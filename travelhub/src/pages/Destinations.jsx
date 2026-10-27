import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import IndiaImage from "../assets/bestindia.jpg";
import IslandsImage from "../assets/Islands.jpg";
import FeaturedImage from "../assets/istockphoto.jpg";
import KalkaImage from "../assets/Kalka.jpg";
import PhilippinesImage from "../assets/philippines.png";
import SonmargImage from "../assets/Sonmarg.jpg";

const categories = ["All", "Nature", "Beach", "Heritage", "Adventure", "City", "Hill"];
const destinations = [
    { id: "india", image: IndiaImage, name: "India", region: "Across India", categories: ["Nature"] },
    { id: "islands", image: IslandsImage, name: "Islands", region: "India and beyond", categories: ["Beach", "Nature"] },
    { id: "featured", image: FeaturedImage, name: "Featured destination", region: "Explore somewhere new", categories: ["Adventure"] },
    { id: "kalka", image: KalkaImage, name: "Kalka", region: "Himachal Pradesh", categories: ["Nature", "Hill"] },
    { id: "philippines", image: PhilippinesImage, name: "Philippines", region: "Southeast Asia", categories: ["Beach"] },
    { id: "sonmarg", image: SonmargImage, name: "Sonmarg", region: "Jammu and Kashmir", categories: ["Nature", "Hill"] },
    { id: "delhi", image: IndiaImage, name: "New Delhi", region: "Delhi", categories: ["City", "Heritage"] },
    { id: "jaipur", image: FeaturedImage, name: "Jaipur", region: "Rajasthan", categories: ["City", "Heritage"] },
    { id: "agra", image: IndiaImage, name: "Agra", region: "Uttar Pradesh", categories: ["Heritage", "City"] },
    { id: "goa", image: IslandsImage, name: "Goa", region: "Goa", categories: ["Beach", "Nature"] },
    { id: "mumbai", image: FeaturedImage, name: "Mumbai", region: "Maharashtra", categories: ["City"] },
    { id: "chennai", image: IndiaImage, name: "Chennai", region: "Tamil Nadu", categories: ["City", "Beach"] },
    { id: "kochi", image: IslandsImage, name: "Kochi", region: "Kerala", categories: ["City", "Beach", "Heritage"] },
    { id: "bengaluru", image: FeaturedImage, name: "Bengaluru", region: "Karnataka", categories: ["City", "Nature"] },
    { id: "munnar", image: SonmargImage, name: "Munnar", region: "Kerala", categories: ["Nature", "Hill"] },
    { id: "manali", image: KalkaImage, name: "Manali", region: "Himachal Pradesh", categories: ["Nature", "Hill", "Adventure"] },
    { id: "rishikesh", image: KalkaImage, name: "Rishikesh", region: "Uttarakhand", categories: ["Nature", "Adventure"] },
    { id: "ooty", image: SonmargImage, name: "Ooty", region: "Tamil Nadu", categories: ["Nature", "Hill"] },
];

function Destinations(){
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedCategory = searchParams.get("category");
    const selectedCategory = categories.includes(requestedCategory) ? requestedCategory : "All";
    const [searchTerm, setSearchTerm] = useState("");
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredDestinations = destinations.filter((destination) => {
        const matchesCategory = selectedCategory === "All" || destination.categories.includes(selectedCategory);
        const searchableText = `${destination.name} ${destination.region} ${destination.categories.join(" ")}`.toLowerCase();
        return matchesCategory && searchableText.includes(normalizedSearch);
    });
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
        </section>
        <section className="home-2 destinations-featured">
            <div className="home-2-content">
                <h1>Destinations</h1>
                                <p>{filteredDestinations.length} destinations to explore</p>
            </div>
                        {filteredDestinations.length > 0 ? (
                            <div className="home-2-row-image">
                                {filteredDestinations.map((destination) => (
                                    <article className="home-2-image-group destination-card" key={destination.id}>
                                        <img src={destination.image} alt={destination.name} />
                                        <div className="destination-card-copy">
                                            <h2>{destination.name}</h2>
                                            <p>{destination.region}</p>
                                            <div className="destination-tags">
                                                {destination.categories.map((category) => <span key={category}>{category}</span>)}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <p className="destination-empty" role="status">No destinations match your search.</p>
                        )}
        </section>
        </main>
    )
}

export default Destinations;