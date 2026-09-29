import MyImage1 from "../assets/bestindia.jpg";
import MyImage2 from "../assets/Islands.jpg";
import MyImage3 from "../assets/istockphoto.jpg";
import MyImage4 from "../assets/Kalka.jpg";
import MyImage5 from "../assets/philippines.png";
import MyImage6 from "../assets/Sonmarg.jpg";
import { accessibilityNeeds } from "./AccessibilityFilters";

export const destinations = [
  { id: "india", image: MyImage1, name: "India", region: "Across India", categories: ["Nature"], accessibility: ["wheelchair", "toilets", "signage", "parking"], featured: true },
  { id: "islands", image: MyImage2, name: "Islands", region: "India and beyond", categories: ["Beach", "Nature"], accessibility: ["toilets", "communication"], featured: true },
  { id: "featured", image: MyImage3, name: "Featured destination", region: "Explore somewhere new", categories: ["Adventure"], accessibility: ["wheelchair", "signage"], featured: true },
  { id: "kalka", image: MyImage4, name: "Kalka", region: "Himachal Pradesh", categories: ["Nature", "Hill"], accessibility: ["wheelchair", "toilets", "parking"], featured: true },
  { id: "philippines", image: MyImage5, name: "Philippines", region: "Southeast Asia", categories: ["Beach"], accessibility: ["communication", "parking"], featured: true },
  { id: "sonmarg", image: MyImage6, name: "Sonmarg", region: "Jammu and Kashmir", categories: ["Nature", "Hill"], accessibility: ["wheelchair", "signage", "communication"], featured: true },
  { id: "delhi", image: MyImage1, name: "New Delhi", region: "Delhi", categories: ["City", "Heritage"], accessibility: ["wheelchair", "toilets", "signage", "communication", "parking"] },
  { id: "jaipur", image: MyImage3, name: "Jaipur", region: "Rajasthan", categories: ["City", "Heritage"], accessibility: ["toilets", "signage"] },
  { id: "agra", image: MyImage1, name: "Agra", region: "Uttar Pradesh", categories: ["Heritage", "City"], accessibility: ["wheelchair", "toilets", "signage"] },
  { id: "goa", image: MyImage2, name: "Goa", region: "Goa", categories: ["Beach", "Nature"], accessibility: ["toilets", "parking"] },
  { id: "mumbai", image: MyImage3, name: "Mumbai", region: "Maharashtra", categories: ["City"], accessibility: ["wheelchair", "signage", "communication", "parking"] },
  { id: "chennai", image: MyImage1, name: "Chennai", region: "Tamil Nadu", categories: ["City", "Beach"], accessibility: ["wheelchair", "toilets", "signage", "parking"] },
  { id: "kochi", image: MyImage2, name: "Kochi", region: "Kerala", categories: ["City", "Beach", "Heritage"], accessibility: ["toilets", "signage", "communication"] },
  { id: "bengaluru", image: MyImage3, name: "Bengaluru", region: "Karnataka", categories: ["City", "Nature"], accessibility: ["wheelchair", "communication", "parking"] },
  { id: "munnar", image: MyImage6, name: "Munnar", region: "Kerala", categories: ["Nature", "Hill"], accessibility: ["toilets"] },
  { id: "manali", image: MyImage4, name: "Manali", region: "Himachal Pradesh", categories: ["Nature", "Hill", "Adventure"], accessibility: ["wheelchair", "parking"] },
  { id: "rishikesh", image: MyImage4, name: "Rishikesh", region: "Uttarakhand", categories: ["Nature", "Adventure"], accessibility: ["communication"] },
  { id: "ooty", image: MyImage6, name: "Ooty", region: "Tamil Nadu", categories: ["Nature", "Hill"], accessibility: ["toilets", "signage"] },
];

const featuredDestinations = destinations.filter((destination) => destination.featured);

function FeaturedDestinations({ items = featuredDestinations, showDetails = false }) {
  return (
    <div className="home-2-row-image">
      {items.map((destination) => (
        <article className="home-2-image-group destination-card" key={destination.id}>
          <img src={destination.image} alt={showDetails ? "" : destination.name} />
          {!showDetails && (
            <p className="destination-access-icons" aria-label="Available accessibility features">
              {accessibilityNeeds
                .filter((need) => destination.accessibility.includes(need.id))
                .map((need) => <span key={need.id} aria-label={need.label} title={need.label}>{need.icon}</span>)}
            </p>
          )}
          {showDetails && (
            <div className="destination-card-copy">
              <h2>{destination.name}</h2>
              <p>{destination.region}</p>
              <div className="destination-tags">
                {destination.categories.map((category) => <span key={category}>{category}</span>)}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default FeaturedDestinations;