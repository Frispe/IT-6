import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './App.css';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [car, setCar] = useState({marka: '', model: '', year: '', color: '', probeg: '', kuzov: '', photo: '', id: null});
  //! конст, чтобы понять, были ли изменения
  const [hasChanges, setHasChanges] = useState(false);

  //! для выбора 
  const marks = ['Toyota', 'Honda', 'Mazda', 'Nissan', 'Audi', 'Volkswagen', 'Subaru', 'Mitsubishi', 'Ford', 'Chevy', 'Porsche'];
  const colors = ['Красный', 'Синий', 'Зеленый', 'Черный', 'Белый', 'Серебристый', 'Midnight Purple', 'Желтый'];
  const kuzovs = ['Седан', 'Хэтчбек', 'Универсал', 'Кроссовер', 'Внедорожник', 'Купе'];

  //! Загрузка данных машины
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];

    const carToEdit = savedCars.find(c => c.id === parseInt(id));
    if (carToEdit) {
      setCar(carToEdit);
    }
  }, [id]);

  //! Обновление состояния машины при изменении полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;

    //! старые знач для тех полей котор не меняются 
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

    setHasChanges(true);
  };

  //! Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    //! Если изменений не было ничего не происх
    if (!hasChanges) {
      return;
    }
    //!список машин из localStorage
    const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
    const updatedCars = savedCars.map(c => {
      if (c.id === car.id) {
        return car; //! Замена старой машины новой
      } else {
        return c;
      }
    });
    //! Сохран обновленный список
    localStorage.setItem('cars', JSON.stringify(updatedCars));
    navigate('/');
  };

  return (
    <div className="app">
      <h1 className="header">Редактировать машину</h1>

      <form onSubmit={handleSubmit} className="forma">
        <div className="aaa">
          <label className="pole">Марка:</label>
          <select name="marka" value={car.marka} onChange={handleChange} className="input" required>
            <option value="">Выберите марку</option>
            {marks.map((mark, index) => (
              <option key={index} value={mark}>{mark}</option>
            ))}
          </select>
        </div>

        <div className="aaa">
          <label className="pole">Модель:</label>
          <input type="text" name="model" value={car.model} onChange={handleChange} className="input" required />
        </div>

        <div className="aaa">
          <label className="pole">Год выпуска:</label>
          <input type="number" name="year" value={car.year} onChange={handleChange} className="input" required />
        </div>

        <div className="aaa">
          <label className="pole">Цвет:</label>
          <select name="color" value={car.color} onChange={handleChange} className="input" required>
            <option value="">Выберите цвет</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
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
