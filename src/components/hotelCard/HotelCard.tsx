import React from "react";
import "./HotelCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HotelCard = ({
  movie: { id, Country, Image, Name, Address, Ranking, HotelChain },
  onEditHotel,
  onDeleteHotel,
  onShowHotelLocation,
}) => {
  return (
    <div className="hotelCard" key={id}>
      <div>
        <h3>{Name}</h3>

        <div className="dropdown">
          <button
            style={{ color: "#FFF" }}
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon="ellipsis-v" inverse />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={(e) => onEditHotel(e, id)}>
                Edit
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => onShowHotelLocation(e, id)}
              >
                Show Location
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={(e) => onDeleteHotel(e, id)}
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <img
          src={Image !== "" ? Image : "https://via.placeholder.com/400"}
          alt={Name}
        />
      </div>

      <div>
        <div className="rank">
          <span>{HotelChain}</span>
          <span>#Rank {Ranking}</span>
        </div>
        <span>{Address}, </span>

        <span>{" " + Country}</span>
      </div>
    </div>
  );
};

export default HotelCard;
