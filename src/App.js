import React, { useState } from 'react';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [currentCar, setCurrentCar] = useState({
    marka: '',
    model: '',
    id: null
  });

  const obrabotchik = (e) => {
    const { name, value } = e.target;
    const newCar = {
      marka: name == 'marka' ? value : currentCar.marka,
      model: name == 'model' ? value : currentCar.model,
      id: currentCar.id
    };
    setCurrentCar(newCar);
  };

  const addAvto = (e) => {
    e.preventDefault();
    if (currentCar.marka.trim() == '' || currentCar.model.trim() == '') return;
    
    if (currentCar.id === null) {
      const newCar = {
        marka: currentCar.marka,
        model: currentCar.model,
        id: Date.now()
      };
      const newCars = cars.slice();
      newCars.push(newCar);
      setCars(newCars);
    }
    else {
      const updatedCars = cars.map(car => {
        if (car.id === currentCar.id) {
          return {
            marka: currentCar.marka,
            model: currentCar.model,
            id: currentCar.id
          };
        }
        return car;
      });
      setCars(updatedCars);
    }
    
    setCurrentCar({
      marka: '',
      model: '',
      id: null
    });
  };

  const deleteAvto = (id) => {
    const deleted = cars.filter(car => car.id !== id);
    setCars(deleted);
  };

  const editAvto = (car) => {
    setCurrentCar({
      marka: car.marka,
      model: car.model,
      id: car.id
    });
  };


  return (
    <div className="app">
      <h1 className="header">Машинки</h1>
      
      <form onSubmit={addAvto} className="forma">
        <div className="aaa">
          <label className="pole">
            Марка:
            <input type="text" name="marka" value={currentCar.marka} onChange={obrabotchik} className="input" required/>
          </label>
        </div>
        
        <div className="aaa">
          <label className="pole">
            Модель:
            <input type="text" name="model" value={currentCar.model} onChange={obrabotchik} className="input" required/>
          </label>
        </div>
        
        <button type="submit" className="button">
          {currentCar.id === null ? 'Добавить' : 'Обновить'}
        </button>
      </form>
      
      <div className="list">
        <h2>Список машинок</h2>
        <ul className="carlist">
          {cars.map(car => (
            <li key={car.id} className="car">
              <span className="car-info">{car.marka} {car.model}</span>
              <div>
                <button onClick={() => editAvto(car)} className="button">Изменить</button>
                <button onClick={() => deleteAvto(car.id)} className="button">Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;