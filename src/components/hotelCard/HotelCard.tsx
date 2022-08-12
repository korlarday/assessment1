import React from 'react';
import './HotelCard.scss';

const HotelCard = ({ movie: { id, Country, Image, Name, Address } }) => {
  return (
    <div className="hotelCard" key={id}>
      <div>
        <p>{Country}</p>
      </div>

      <div>
        <img src={Image !== "N/A" ? Image : "https://via.placeholder.com/400"} alt={Name} />
      </div>

      <div>
        <span>{Address}</span>
        <h3>{Name}</h3>
      </div>
    </div>
  );
}

export default HotelCard;