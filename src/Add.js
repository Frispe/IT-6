// Add.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Add() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [car, setCar] = useState({
    marka: '', 
    model: '', 
    year: '', 
    color: '', 
    probeg: '', 
    kuzov: '', 
    photo: '', 
    id: Date.now()
  });

  const marks = {
    'Toyota': ['Supra', 'Land Cruiser'],
    'Honda': ['Civic', 'NSX'],
    'Mazda': ['MX-5', 'RX-7'],
    'Nissan': ['Skyline', 'Silvia'],
    'Audi': ['RS6', 'Quattro S1'],
    'Volkswagen': ['Golf', 'Touran'],
    'Subaru': ['Impreza', 'BRZ'],
    'Mitsubishi': ['Lancer', 'Eclipse'],
    'Ford': ['Focus', 'Mustang'],
    'Chevy': ['Tahoe', 'Camaro'],
    'Porsche': ['911', 'Panamera',]
  };
  const kuzovs = ['Седан', 'Хэтчбек', 'Универсал', 'Кроссовер', 'Внедорожник', 'Купе'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'marka' && { model: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    const updatedCars = [...savedCars, car];
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    navigate('/');
  };

  return (
    <div className="app">
      <h1 className="header">Добавить новую машину</h1>

      <form onSubmit={handleSubmit} className="forma">
        <div className="aaa">
          <label className="pole">Марка:
            <select 
              name="marka" 
              value={car.marka} 
              onChange={handleChange} 
              className="input" 
              required
            >
              <option value="">Выберите марку</option>
              {Object.keys(marks).map((mark, index) => (
                <option key={index} value={mark}>{mark}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Модель:
            <select 
              name="model" 
              value={car.model} 
              onChange={handleChange} 
              className="input" 
              required
              disabled={!car.marka}
            >
              <option value="">Выберите модель</option>
              {car.marka && marks[car.marka].map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Год выпуска:
            <input 
              type="number" 
              name="year" 
              value={car.year} 
              onChange={handleChange} 
              className="input" 
              min="1950" 
              max={currentYear}
              required 
            />
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Цвет:
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="color" 
                name="color" 
                value={car.color} 
                onChange={handleChange} 
                style={{ width: '50px', height: '50px' }}
                required 
              />
              <span>{car.color}</span>
            </div>
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Пробег:
            <input type="number" name="probeg" value={car.probeg} onChange={handleChange} className="input" required />
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Тип кузова:
            <select name="kuzov" value={car.kuzov} onChange={handleChange} className="input" required>
              <option value="">Выберите тип кузова</option>
              {kuzovs.map((kuzov, index) => (
                <option key={index} value={kuzov}>{kuzov}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Ссылка на фотку
            <input type="text" name="photo" value={car.photo} onChange={handleChange} className="input" />
          </label>
        </div>

        <button type="submit" className="button">Добавить</button>
        <Link to="/" className="button">Назад</Link>
      </form>
    </div>
  );
}

export default Add;