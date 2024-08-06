import React, { useState } from 'react';

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

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="p-2 mb-14 max-w-[100%] flex flex-col items-center mt-[10%]">
      <div className='w-full max-w-[60%]'>
      <h2 className="text-2xl font-bold text-center mb-4">Публикация</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Название</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
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
        <button type="submit" className="btn btn-success w-full">Выполнить</button>
      </form>
      </div>
    </div>
  );
};

export default Add;
