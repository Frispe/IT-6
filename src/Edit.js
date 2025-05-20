import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './App.css';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentYear = new Date().getFullYear();

  const [car, setCar] = useState({marka: '', model: '', year: '', color: '#000000',probeg: '', kuzov: '', photo: '', id: null});
  const [hasChanges, setHasChanges] = useState(false);

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

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    const carToEdit = savedCars.find(c => c.id === parseInt(id));
    if (carToEdit) {
      setCar({
        ...carToEdit,
        color: carToEdit.color.startsWith('#') ? carToEdit.color : '#000000'
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'marka' && { model: '' })
    }));
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasChanges) return;
    
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    const updatedCars = savedCars.map(c => c.id === car.id ? car : c);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    navigate('/');
  };

  return (
    <div className="app">
      <h1 className="header">Редактировать машину</h1>

      <form onSubmit={handleSubmit} className="forma">
        <div className="aaa">
          <label className="pole">Марка:</label>
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
        </div>

        <div className="aaa">
          <label className="pole">Модель:</label>
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
        </div>

        <div className="aaa">
          <label className="pole">Год выпуска:</label>
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
        </div>

        <div className="aaa">
          <label className="pole">Цвет:</label>
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
        </div>

        <div className="aaa">
          <label className="pole">Пробег:</label>
          <input type="number" name="probeg" value={car.probeg} onChange={handleChange} className="input" required />
        </div>

        <div className="aaa">
          <label className="pole">Тип кузова:</label>
          <select name="kuzov" value={car.kuzov} onChange={handleChange} className="input" required>
            <option value="">Выберите тип кузова</option>
            {kuzovs.map((kuzov, index) => (
              <option key={index} value={kuzov}>{kuzov}</option>
            ))}
          </select>
        </div>

        <div className="aaa">
          <label className="pole">Ссылка на фотку:</label>
          <input type="text" name="photo" value={car.photo} onChange={handleChange} className="input" />
        </div>

        <div className="form-buttons">
          <button type="submit" className="button" disabled={!hasChanges}>Сохранить</button>
          <Link to="/" className="button">Назад</Link>
        </div>
      </form>
    </div>
  );
}

export default Edit;