import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const carsData = localStorage.getItem('cars');
    if (carsData) {
      setCars(JSON.parse(carsData));
    }
  }, []);

  const deleteAvto = (carId) => {
    const newCars = cars.filter(car => car.id !== carId);
    setCars(newCars);
    localStorage.setItem('cars', JSON.stringify(newCars));
  };

  return (
    <div className="app">
      <h1 className="header">Машинки</h1>
      <Link to="/add" className="button add-button">Добавить машину</Link>

      <div className="list">
        <h2 className='list-title'>Список машинок</h2>
        <div className="carlist">
          {cars.map(car => (
            <div key={car.id} className="car-card">
              {car.photo && <img src={car.photo} alt="Машина" className="car-photo" />}

              <div className="car-info">
                <p><strong>Марка:</strong> {car.marka}</p>
                <p><strong>Модель:</strong> {car.model}</p>
                <p><strong>Год:</strong> {car.year}</p>
                <p><strong>Цвет:</strong> {car.color}</p>
                <p><strong>Пробег:</strong> {car.probeg}</p>
                <p><strong>Кузов:</strong> {car.kuzov}</p>
              </div>

              <div className="car-actions">
                <Link to={`/edit/${car.id}`} className="button">Изменить</Link>
                <button onClick={() => deleteAvto(car.id)} className="button">Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;