import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

function Add() {
  const navigate = useNavigate();
  const [car, setCar] = useState({marka: '', model: '', year: '', color: '', probeg: '', kuzov: '', photo: '', id: Date.now()
  });

  const marks = ['Toyota', 'Honda', 'Mazda', 'Nissan', 'Audi', 'Volkswagen', 'Subaru', 'Mitsubishi', 'Ford', 'Chevy', 'Porsche'];
  const colors = ['Красный', 'Синий', 'Зеленый', 'Черный', 'Белый', 'Серебристый', 'Midnight Purple', 'Желтый'];
  const kuzovs = ['Седан', 'Хэтчбек', 'Универсал', 'Кроссовер', 'Внедорожник', 'Купе'];

  //! Функция для обновления состояния при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({
      marka: name === 'marka' ? value : car.marka,
      model: name === 'model' ? value : car.model,
      year: name === 'year' ? value : car.year,
      color: name === 'color' ? value : car.color,
      probeg: name === 'probeg' ? value : car.probeg,
      kuzov: name === 'kuzov' ? value : car.kuzov,
      photo: name === 'photo' ? value : car.photo,
      id: car.id
    });
  };

  //! Функция для отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); //! чтоб не было перезагрузки страницы
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
            <select name="marka" value={car.marka} onChange={handleChange} className="input" required>
              <option value="">Выберите марку</option>
              {marks.map((mark, index) => (
                <option key={index} value={mark}>{mark}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Модель:
            <input type="text" name="model" value={car.model} onChange={handleChange} className="input" required />
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Год выпуска:
            <input type="number" name="year" value={car.year} onChange={handleChange} className="input" required />
          </label>
        </div>

        <div className="aaa">
          <label className="pole">Цвет:
            <select name="color" value={car.color} onChange={handleChange} className="input" required>
              <option value="">Выберите цвет</option>
              {colors.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>
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
