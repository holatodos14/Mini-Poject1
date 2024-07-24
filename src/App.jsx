import React, { useState, useEffect } from 'react';
import Nav from './components/Nav/index';
import Card from './components/Cards/index';
import './App.css'

function App() {
  const [stays, setStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [guestCount, setGuestCount] = useState(0);

  const fetchStays = async () => {
    try {
      const response = await fetch('stays.json')
      const data = await response.json();
      setStays(data);
      setFilteredStays(data);
    } catch (error) {
      console.error('Error loading stays data:', error);
    }
  }

  useEffect(() => {
    fetchStays();
  }, []);

  useEffect(() => {
    let filtered = stays;
    if (selectedCity) {
      const [city, country] = selectedCity.split(', ');
      filtered = filtered.filter(stay => stay.city === city && stay.country === country);
    }
    if (guestCount > 0) {
      filtered = filtered.filter(stay => stay.maxGuests >= guestCount);
    }
    setFilteredStays(filtered);
  }, [selectedCity, guestCount, stays]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  }

  const handleGuestSelect = (count) => {
    setGuestCount(count);
  }

  const cities = [...new Set(stays.map(stay => `${stay.city}, ${stay.country}`))];

  return (
    <div className="app">
      <Nav
        cities={cities}
        selectedCity={selectedCity}
        guestCount={guestCount}
        onCitySelect={handleCitySelect}
        onGuestSelect={handleGuestSelect}
      />
      <main>
        <h1>Stays in {selectedCity || 'Finland'}</h1>
        <p>{filteredStays.length} stays</p>
        <div className="card-container">
          {filteredStays.map((stay) => (
            <Card key={stay.title} stay={stay} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;