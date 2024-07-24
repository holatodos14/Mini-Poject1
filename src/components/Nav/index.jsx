import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './nav.css'
import Modal from './Modal'

function Nav({ cities, selectedCity, guestCount, onCitySelect, onGuestSelect }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('location');

  const handleOpenModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <nav>
      <div className="logo">
        <img src="./logo.svg" alt="logo" />
      </div>
      <div className="search-bar">
        <div className="search-item" onClick={handleOpenModal}>{selectedCity || 'Add location'}</div>
        <div className="search-item">Add guests</div>
        <button className="search-button">
          <FaSearch className="search-icon" />
        </button>
      </div>
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cities={cities}
        onSelectCity={onCitySelect}
        onSelectGuests={onGuestSelect}
        activeTab={activeTab}
      />
    </nav>
  );
}

export default Nav;