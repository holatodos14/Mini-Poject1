import React from 'react';

function Card({ stay }) {
  return (
    <div className="card">
      <img src={stay.photo} alt={stay.title} className="card-image" />
      <div className="card-info">
        {stay.superHost && <span className="superhost-badge">SUPER HOST</span>}
        <span className="stay-type">{stay.type} · {stay.beds ? `${stay.beds} beds` : 'No bed info'}</span>
        <span className="rating"><span className='star'>★</span> {stay.rating}</span>
      </div>
      <h2 className="card-title">{stay.title}</h2>
      <p className="max-guests">Max guests: {stay.maxGuests}</p>
    </div>
  );
}

export default Card;