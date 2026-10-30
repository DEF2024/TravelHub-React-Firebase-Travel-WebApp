import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import IndiaImage from "../assets/bestindia.jpg";
import IslandsImage from "../assets/Islands.jpg";
import FeaturedImage from "../assets/istockphoto.jpg";
import KalkaImage from "../assets/Kalka.jpg";
import PhilippinesImage from "../assets/philippines.png";
import SonmargImage from "../assets/Sonmarg.jpg";
import NatureIcon from "../assets/treeicon.png";
import BeachIcon from "../assets/beachicon.png";
import HeritageIcon from "../assets/heritageicon.png";
import AdventureIcon from "../assets/adventureicon.png";
import CityIcon from "../assets/city-icon.png";
import HillIcon from "../assets/hill-icon.png";
import { useAuth } from "../hooks/useAuth";
import {
    listSavedDestinations,
    setDestinationSaved,
    watchCategories,
    watchDestinations,
} from "../services/destinationService";

const categories = ["All", "Nature", "Beach", "Heritage", "Adventure", "City", "Hill"];
const accessibilityFeatures = [
    { id: "wheelchair", label: "Wheelchair access", symbol: "wheelchair" },
    { id: "accessibleToilets", label: "Accessible toilets", symbol: "toilet" },
    { id: "visualSignage", label: "Visual signage", symbol: "signage" },
    { id: "communicationSupport", label: "Communication support", symbol: "communication" },
    { id: "parking", label: "Parking available", symbol: "parking" },
];
const categoryIcons = {
    Nature: NatureIcon,
    Beach: BeachIcon,
    Heritage: HeritageIcon,
    Adventure: AdventureIcon,
    City: CityIcon,
    Hill: HillIcon,
};
const initialDestinations = [
    { id: "india", image: IndiaImage, name: "India", region: "Across India", categories: ["Nature"], accessibility: ["visualSignage", "parking"] },
    { id: "islands", image: IslandsImage, name: "Islands", region: "India and beyond", categories: ["Beach", "Nature"], accessibility: ["wheelchair", "accessibleToilets", "parking"] },
    { id: "featured", image: FeaturedImage, name: "Featured destination", region: "Explore somewhere new", categories: ["Adventure"], accessibility: ["visualSignage", "communicationSupport"] },
    { id: "kalka", image: KalkaImage, name: "Kalka", region: "Himachal Pradesh", categories: ["Nature", "Hill"], accessibility: ["parking"] },
    { id: "philippines", image: PhilippinesImage, name: "Philippines", region: "Southeast Asia", categories: ["Beach"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "parking"] },
    { id: "sonmarg", image: SonmargImage, name: "Sonmarg", region: "Jammu and Kashmir", categories: ["Nature", "Hill"], accessibility: ["visualSignage"] },
    { id: "delhi", image: IndiaImage, name: "New Delhi", region: "Delhi", categories: ["City", "Heritage"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "communicationSupport", "parking"] },
    { id: "jaipur", image: FeaturedImage, name: "Jaipur", region: "Rajasthan", categories: ["City", "Heritage"], accessibility: ["wheelchair", "visualSignage", "parking"] },
    { id: "agra", image: IndiaImage, name: "Agra", region: "Uttar Pradesh", categories: ["Heritage", "City"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "parking"] },
    { id: "goa", image: IslandsImage, name: "Goa", region: "Goa", categories: ["Beach", "Nature"], accessibility: ["wheelchair", "accessibleToilets", "communicationSupport", "parking"] },
    { id: "mumbai", image: FeaturedImage, name: "Mumbai", region: "Maharashtra", categories: ["City"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "communicationSupport", "parking"] },
    { id: "chennai", image: IndiaImage, name: "Chennai", region: "Tamil Nadu", categories: ["City", "Beach"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "parking"] },
    { id: "kochi", image: IslandsImage, name: "Kochi", region: "Kerala", categories: ["City", "Beach", "Heritage"], accessibility: ["wheelchair", "visualSignage", "communicationSupport", "parking"] },
    { id: "bengaluru", image: FeaturedImage, name: "Bengaluru", region: "Karnataka", categories: ["City", "Nature"], accessibility: ["wheelchair", "accessibleToilets", "visualSignage", "communicationSupport", "parking"] },
].map((destination, index) => ({
    ...destination,
    featured: destination.featured ?? [0, 2, 5, 8].includes(index),
    rating: destination.rating ?? "4.9",
    reviews: destination.reviews ?? 290 + index * 80,
    description: destination.description ?? `The world's largest coral reef ecosystem. Experience world-class citizen marine adventures in ${destination.region}.`,
}));

function Destinations() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const requestedCategory = searchParams.get("category");
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
    const [selectedRegion, setSelectedRegion] = useState("All regions");
    const [sortOrder, setSortOrder] = useState("name");
    const [destinations, setDestinations] = useState(initialDestinations);
    const [availableCategories, setAvailableCategories] = useState(categories);
    const [favourites, setFavourites] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [dataError, setDataError] = useState("");
    const [usingSampleData, setUsingSampleData] = useState(false);
    const [savingFavourite, setSavingFavourite] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const destinationsPerPage = 8;
    const selectedCategory = availableCategories.includes(requestedCategory) ? requestedCategory : "All";
    const regions = useMemo(
        () => [...new Set(destinations.map((destination) => destination.region).filter(Boolean))].sort(),
        [destinations],
    );

    useEffect(() => {
        let active = true;
        let destinationLoaded = false;
        let categoriesLoaded = false;

        const finishLoading = () => {
            if (destinationLoaded && categoriesLoaded && active) setLoading(false);
        };
        const unsubscribeDestinations = watchDestinations((destinationResults) => {
            if (!active) return;
            destinationLoaded = true;
            setDestinations(destinationResults.length > 0 ? destinationResults : initialDestinations);
            setUsingSampleData(destinationResults.length === 0);
            finishLoading();
        }, (loadError) => {
            console.error("Unable to watch public destination data.", loadError);
            if (active) {
                setUsingSampleData(true);
                setDataError("Could not load the latest destinations from Firestore. Showing the included sample places.");
                destinationLoaded = true;
                finishLoading();
            }
        });
        const unsubscribeCategories = watchCategories((categoryResults) => {
            if (!active) return;
            categoriesLoaded = true;
            const firestoreCategories = categoryResults.map((category) => category.name);
            if (firestoreCategories.length > 0) setAvailableCategories(["All", ...firestoreCategories]);
            finishLoading();
        }, (loadError) => {
            console.error("Unable to watch destination categories.", loadError);
            if (active) {
                categoriesLoaded = true;
                finishLoading();
            }
        });

        return () => {
            active = false;
            unsubscribeDestinations();
            unsubscribeCategories();
        };
    }, []);

    useEffect(() => {
        let active = true;
        if (!user) {
            setFavourites(new Set());
            return undefined;
        }
        listSavedDestinations(user.uid)
            .then((saved) => {
                if (active) setFavourites(new Set(saved.map((item) => item.destinationId)));
            })
            .catch((savedError) => {
                console.error("Unable to load saved destinations.", savedError);
                if (active) setDataError("Unable to load your saved destinations.");
            });
        return () => { active = false; };
    }, [user]);

    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    const filteredDestinations = useMemo(() => {
        const results = destinations.filter((destination) => {
            const matchesCategory = selectedCategory === "All" || destination.categories.includes(selectedCategory);
            const matchesRegion = selectedRegion === "All regions" || destination.region === selectedRegion;
            const searchableText = `${destination.name} ${destination.region} ${destination.categories.join(" ")}`.toLocaleLowerCase();
            return matchesCategory && matchesRegion && searchableText.includes(normalizedSearch);
        });

        return results.sort((first, second) => {
            if (sortOrder === "region") {
                return first.region.localeCompare(second.region) || first.name.localeCompare(second.name);
            }
            return first.name.localeCompare(second.name);
        });
    }, [normalizedSearch, selectedCategory, selectedRegion, sortOrder]);

    const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / destinationsPerPage));
    const visibleDestinations = filteredDestinations.slice(
        (currentPage - 1) * destinationsPerPage,
        currentPage * destinationsPerPage,
    );

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const changePage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleCategoryChange = (category) => {
        setCurrentPage(1);
        setSearchParams(category === "All" ? {} : { category });
    };
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedRegion("All regions");
        setSortOrder("name");
        setCurrentPage(1);
        setSearchParams({});
    };
    const toggleFavourite = async (destination) => {
        if (!user) {
            navigate("/login");
            return;
        }
        setSavingFavourite(destination.id);
        setDataError("");
        const shouldSave = !favourites.has(destination.id);
        try {
            await setDestinationSaved(user.uid, destination, shouldSave);
            setFavourites((current) => {
                const updated = new Set(current);
                if (shouldSave) updated.add(destination.id);
                else updated.delete(destination.id);
                return updated;
            });
        } catch (saveError) {
            console.error("Unable to update saved destinations.", saveError);
            setDataError("Unable to save this destination. Please try again.");
        } finally {
            setSavingFavourite("");
        }
    };

    return(
        <main className="wrapper destinations-page">
            <h1 className="destination-page-title">Explore destinations</h1>
            {dataError && <p className="destination-data-message" role="status">{dataError}</p>}
            {!dataError && usingSampleData && (
                <p className="destination-data-message" role="status">These are sample destinations. Published Firestore destinations will appear here when available.</p>
            )}
            <section className="destination-filter-panel" aria-label="Filter destinations">
                <div className="destination-filter-controls">
                    <label className="destination-keyword">
                        <span className="visually-hidden">Search destinations by name, city, or state</span>
                        <span className="destination-search-icon" aria-hidden="true">⌕</span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search keyword, city, or state..."
                        />
                    </label>
                    <label className="visually-hidden" htmlFor="destination-region">Filter by state or region</label>
                    <select id="destination-region" value={selectedRegion} onChange={(event) => { setSelectedRegion(event.target.value); setCurrentPage(1); }}>
                        <option>All regions</option>
                        {regions.map((region) => <option key={region}>{region}</option>)}
                    </select>
                    <label className="visually-hidden" htmlFor="destination-category">Filter by category</label>
                    <select
                        id="destination-category"
                        value={selectedCategory}
                        onChange={(event) => handleCategoryChange(event.target.value)}
                    >
                        {categories.map((category) => <option key={category} value={category}>{category === "All" ? "All Categories" : category}</option>)}
                    </select>
                    <label className="visually-hidden" htmlFor="destination-sort">Sort destinations</label>
                    <select id="destination-sort" value={sortOrder} onChange={(event) => { setSortOrder(event.target.value); setCurrentPage(1); }}>
                        <option value="name">Sort: Name A-Z</option>
                        <option value="region">Sort: State A-Z</option>
                    </select>
                </div>

                <div className="destination-filter-footer">
                    <div className="travel-where">
                        <ul>
                            {categories.map((category) => (
                                <li key={category}>
                                    <button
                                        type="button"
                                        aria-pressed={selectedCategory === category}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {categoryIcons[category] && (
                                            <img src={categoryIcons[category]} alt="" aria-hidden="true" />
                                        )}
                                        {category === "All" ? "All Categories" : category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="destination-result-tools">
                        <p role="status">Showing <strong>{filteredDestinations.length}</strong> destinations</p>
                        <button type="button" className="destination-reset" onClick={resetFilters}>↺ Reset</button>
                    </div>
                </div>
            </section>

            {filteredDestinations.length > 0 ? (
                <>
                <section className="destination-results" aria-label="Destination search results">
                    {visibleDestinations.map((destination) => {
                        const isFavourite = favourites.has(destination.id);
                        const destinationImage = destination.imageUrl || destination.image || FeaturedImage;
                        return (
                            <article className="destination-result-card" key={destination.id}>
                                <div className="destination-result-image">
                                    <img src={destinationImage} alt={destination.name} />
                                    <div className="destination-result-badges">
                                        {destination.featured && <span className="is-featured">✦ Featured</span>}
                                        <span className="destination-eco-badge">♧ Eco</span>
                                    </div>
                                    <button
                                        type="button"
                                        className={`destination-favourite${isFavourite ? " is-favourite" : ""}`}
                                        onClick={() => toggleFavourite(destination)}
                                        disabled={savingFavourite === destination.id}
                                        aria-label={isFavourite ? `Remove ${destination.name} from favourites` : `Add ${destination.name} to favourites`}
                                        aria-pressed={isFavourite}
                                    >
                                        {isFavourite ? "♥" : "♡"}
                                    </button>
                                </div>
                                <div className="destination-result-copy">
                                    <div className="destination-result-summary">
                                        <p className="destination-result-location">
                                            <span aria-hidden="true">⌖</span> {destination.region === destination.name ? destination.name : `${destination.name}, ${destination.region}`}
                                        </p>
                                    </div>
                                    <p className="destination-result-rating">★ <span>{destination.rating ?? "4.9"} ({destination.reviews ?? 290})</span></p>
                                    <h2>{destination.name === "Featured destination" ? "Great Barrier Reef Marine Life" : destination.name}</h2>
                                    <p className="destination-result-description">
                                        {destination.description}
                                    </p>
                                    <p className="destination-result-category">ACCESSIBILITY HIGHLIGHTS</p>
                                    <div className="destination-accessibility-icons" aria-label="Accessibility supports">
                                        <span title="Assistance / mobility support">🚶</span>
                                        <span title="Wheelchair accessibility">♿</span>
                                        <span title="Accessible parking">🅿️</span>
                                        <span title="Hearing accessibility">🦻</span>
                                    </div>
                                    <div className="destination-result-actions">
                                        <Link to={`/destinations?q=${encodeURIComponent(destination.name)}`}>Explore Guide →</Link>
                                        <Link to="/trips">＋ Add to Trip</Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>
                {totalPages > 1 && (
                    <nav className="destination-pagination" aria-label="Destination pages">
                        <button
                            type="button"
                            className="destination-page-arrow"
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            ‹
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            type="button"
                            className="destination-page-arrow"
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            ›
                        </button>
                    </nav>
                )}
                </>
            ) : loading ? (
                <p className="destination-empty" role="status">Loading destinations…</p>
            ) : (
                <p className="destination-empty" role="status">No destinations match your search. Try another state or reset the filters.</p>
            )}
        </main>
    )
}

function AccessibilitySymbol({ type }) {
    const sharedProps = {
        "aria-hidden": true,
        className: "accessibility-symbol",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.8,
        viewBox: "0 0 24 24",
    };

    switch (type) {
        case "wheelchair":
            return (
                <svg {...sharedProps}>
                    <circle cx="7.5" cy="5" r="1.7" />
                    <circle cx="9" cy="17" r="4.3" />
                    <path d="M8 8.5 10 13h5l2 4m-7-8 5-1m-4 5-2 3" />
                </svg>
            );
        case "toilet":
            return (
                <svg {...sharedProps}>
                    <path d="M5 4h5v5H5zM14 4h5v5h-5zM6 12h12l-1 7H7zM9 12V9m6 3V9" />
                </svg>
            );
        case "signage":
            return (
                <svg {...sharedProps}>
                    <path d="M4 5h16v11H4zM12 16v4M9 20h6" />
                    <path d="M8 12V9l2-2 2 2v3m-4-2h4m2 2 2-5 2 5m-3.3-1h2.6" />
                </svg>
            );
        case "communication":
            return (
                <svg {...sharedProps}>
                    <path d="M4 5h12v9H9l-4 3v-3H4zM12 10h8v8h-2v3l-3-3h-3" />
                    <path d="M7 9h6m-6 2h4" />
                </svg>
            );
        case "parking":
            return (
                <svg {...sharedProps}>
                    <path d="M6 20V4h6a5 5 0 0 1 0 10H6m0-5h6" />
                </svg>
            );
        default:
            return null;
    }
}

export default Destinations;