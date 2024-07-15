import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './Modal.css';

function Modal({ isOpen, onClose, cities, onSelectCity, selectedCity }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)

  const modalRef = useRef();
  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }
  useEffect(() => {
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-search-bar">
          <div className="search-location">
            <label htmlFor="location">LOCATION</label>
            <input
              id="location"
              type="text"
              placeholder= {selectedCity || 'Add location'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-guests">
            <label htmlFor="guests">GUESTS</label>
            <input
              id="guests"
              type="text"
              placeholder="Add guests"
            />
          </div>
          <button className="search-button" onClick={onClose}>
            <FaSearch /> Search
          </button>
        </div>
        <div className="city-list">
          {filteredCities.map(city => (
            <div key={city} className="city-item" onClick={() => onSelectCity(city)}>
              <FaMapMarkerAlt /> {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;