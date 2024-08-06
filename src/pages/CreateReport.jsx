import React, { useState, useEffect } from 'react';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      image,
      location
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="p-4 mb-14 max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Отправка жалобы</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Тема жалобы</label>
          <select className="select select-bordered w-full" required>
            <option disabled selected>Выберите тему вашей жалобы</option>
            <option>Вырубка деревьев</option>
            <option>Незаконное строительство</option>
            <option>Выброс мусора</option>
          </select>
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
          {image && <img src={image} alt="Selected" className="mt-4 w-full h-auto rounded-md shadow-sm" />}
        </div>
        <button type="submit" className="btn btn-success w-full">Отправить</button>
      </form>
    </div>
  );
};

export default Add;
