import React, { useState, useEffect } from 'react';
import Nav from './components/Nav/index';
import Card from './components/Cards/index';
import './App.css'

function App() {
  const [stays, setStays] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredStays, setFilteredStays] = useState([]);

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
    if (selectedCity) {
      const [city, country] = selectedCity.split(', ');
      const filtered = stays.filter(stay => stay.city === city && stay.country === country);
      setFilteredStays(filtered);
    } else {
      setFilteredStays(stays);
    }
  }, [selectedCity, stays]);

  const cities = [...new Set(stays.map(stay => `${stay.city}, ${stay.country}`))];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  }

  return (
    <div className="app">
      <Nav 
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
      />
      <main>
        <h1>Stays in {selectedCity || 'Finland'}</h1>
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