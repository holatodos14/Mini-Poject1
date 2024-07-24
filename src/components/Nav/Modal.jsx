import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './Modal.css';

function Modal({ isOpen, onClose, cities, onSelectCity, onSelectGuests, activeTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    onSelectGuests(adults + children);
    onClose();
  };

  const incrementGuests = (type) => {
    if (type === 'adults') setAdults(adults + 1);
    else setChildren(children + 1);
  };

  const decrementGuests = (type) => {
    if (type === 'adults' && adults > 0) setAdults(adults - 1);
    else if (type === 'children' && children > 0) setChildren(children - 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-search-bar">
          <div className={`search-item ${activeTab === 'location' ? 'active' : ''}`}>
            <label>LOCATION</label>
            <input
              type="text"
              placeholder="Add location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={`search-item ${activeTab === 'guests' ? 'active' : ''}`}>
            <label>GUESTS</label>
            <input
              type="text"
              placeholder="Add guests"
              value={adults + children > 0 ? `${adults + children} guests` : ''}
              readOnly
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            <FaSearch /> Search
          </button>
        </div>
        <div className="modal-content-body">
          {activeTab === 'location' && (
            <div className="city-list">
              {filteredCities.map(city => (
                <div key={city} className="city-item" onClick={() => onSelectCity(city)}>
                  <FaMapMarkerAlt /> {city}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'guests' && (
            <div className="guests-selector">
              <div className="guest-type">
                <h3>Adults</h3>
                <p>Ages 13 or above</p>
                <div className="guest-counter">
                  <button onClick={() => decrementGuests('adults')}>-</button>
                  <span>{adults}</span>
                  <button onClick={() => incrementGuests('adults')}>+</button>
                </div>
              </div>
              <div className="guest-type">
                <h3>Children</h3>
                <p>Ages 2-12</p>
                <div className="guest-counter">
                  <button onClick={() => decrementGuests('children')}>-</button>
                  <span>{children}</span>
                  <button onClick={() => incrementGuests('children')}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

/* placeholder= {selectedCity || 'Add location'} */