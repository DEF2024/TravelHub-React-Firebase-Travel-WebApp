import { useState } from "react";

export function DestinationCard({ destination }) {
  const {
    name,
    location,
    image,
    imager,
    rating,
    price,
    tag,
    favourite = false,
  } = destination || {};

  const [fav, setFav] = useState(favourite);
  const cardImage = image || imager;

  return (
    <div className="dest-card">
      <div className="dest-img-wrap">
        {cardImage && (
          <img src={cardImage} alt={name} className="dest-image" />
        )}

        <div
          className={`dest-fav ${fav ? "active" : ""}`}
          onClick={() => setFav((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-label={fav ? "Remove from favourites" : "Add to favourites"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFav((prev) => !prev);
            }
          }}
        >
          ♥
        </div>

        {tag && <div className="dest-tag">{tag}</div>}
      </div>

      <div className="dest-body">
        <h3>{name}</h3>
        <p className="dest-loc">{location}</p>
        <div className="dest-meta">
          <span className="dest-rating">★ {rating}</span>
          <span className="dest-price">
            from <b>₹{price?.toLocaleString?.() ?? price}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;