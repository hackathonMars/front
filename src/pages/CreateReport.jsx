import React, { useState, useEffect } from 'react';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', selectedTopic);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('location', JSON.stringify(location));
    formData.append('phone', phone);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    try {
      const response = await fetch('YOUR_BACKEND_URL', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Complaint submitted successfully');
      } else {
        console.error('Error submitting complaint');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="p-4 mb-14 max-w-2xl mx-auto shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Отправка жалобы</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Тема жалобы</label>
          <select
            className="select select-bordered w-full"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            required
          >
            <option disabled value="">Выберите тему вашей жалобы</option>
            <option>Вырубка деревьев</option>
            <option>Незаконное строительство</option>
            <option>Выброс мусора</option>
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <label className='block text-sm font-medium'>Введите ваш номер телефона</label>
          <input
            type="tel"
            placeholder="+99812345678"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col mb-2'>
          <label>Введите ваше имя</label>
          <input
            type="text"
            placeholder='Имя'
            className="input input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col mb-2'>
          <label>Введите вашу фамилию</label>
          <input
            type="text"
            placeholder='Фамилия'
            className="input input-bordered w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Выберите фотографию</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-full">Отправить</button>
      </form>
    </div>
  );
};

export default Add;
