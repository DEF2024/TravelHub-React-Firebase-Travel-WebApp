import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Munnar",
    location: "Kerala, India",
    rating: 4.8,
    price: 6999,
    tag: "Popular",
    favourite: true,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500",
  },
  {
    name: "Goa",
    location: "Goa, India",
    rating: 4.6,
    price: 5499,
    tag: "Beach",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500",
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    rating: 4.7,
    price: 7299,
    tag: "Heritage",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500",
  },
];

function DestinationsGrid() {
  return (
    <div className="dest-grid">
      {destinations.map((destination) => (
        <DestinationCard key={destination.name} destination={destination} />
      ))}
    </div>
  );
}

export default DestinationsGrid;
