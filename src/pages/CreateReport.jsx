import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import DotImg from '../assets/mapMar1.png'; // Make sure to import your custom marker image

// For default marker icons
delete L.Icon.Default.prototype._getIconUrl;

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: DotImg,
  iconSize: [32, 32], // Adjust size as needed
  iconAnchor: [16, 32], // Adjust anchor as needed
  popupAnchor: [0, -32], // Adjust popup anchor as needed
});

const AutoCenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center.lat && center.lng) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const Add = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London

  // Handle image file change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setValue('image', e.target.files[0]); // Set image value for FormData
    } else {
      setImage(null);
      setValue('image', null);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.selectedTopic);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('location', JSON.stringify(location));
    formData.append('phone', data.phone);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);

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

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]); // Update map center
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle map click to open child window
  const onMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const childWindow = window.open(`child.html?lat=${lat}&lng=${lng}`, "MsgWindow", "width=400,height=200");

    // Function to receive messages from the child window
    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin) {
        const { lat, lng } = event.data;
        if (lat && lng) {
          setMapCenter([lat, lng]); // Update map center
        }
      }
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 mb-14 max-w-6xl mx-auto">
      <div className="md:w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-5 text-center">Отправка жалобы</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Тема жалобы</label>
            <select
              className="select select-bordered w-full"
              {...register('selectedTopic', { required: 'Выберите тему вашей жалобы' })}
            >
              <option value="">Выберите тему вашей жалобы</option>
              <option value="Вырубка деревьев">Вырубка деревьев</option>
              <option value="Незаконное строительство">Незаконное строительство</option>
              <option value="Выброс мусора">Выброс мусора</option>
            </select>
            {errors.selectedTopic && <p className="text-red-500 text-xs mt-1">{errors.selectedTopic.message}</p>}
          </div>

          <div className='flex flex-col mb-2'>
            <label className='block text-sm font-medium'>Введите ваш номер телефона</label>
            <input
              type="tel"
              placeholder="+99812345678"
              className="input input-bordered w-full"
              {...register('phone', { required: 'Введите номер телефона' })}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div className='flex flex-col mb-2'>
            <label>Введите ваше имя</label>
            <input
              type="text"
              placeholder='Имя'
              className="input input-bordered w-full"
              {...register('firstName', { required: 'Введите ваше имя' })}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div className='flex flex-col mb-2'>
            <label>Введите вашу фамилию</label>
            <input
              type="text"
              placeholder='Фамилия'
              className="input input-bordered w-full"
              {...register('lastName', { required: 'Введите вашу фамилию' })}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Описание</label>
            <textarea
              {...register('description', { required: 'Введите описание' })}
              className="textarea textarea-bordered w-full"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Выберите фотографию</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>

          <button type="submit" className="btn btn-success w-full">Отправить</button>
        </form>
      </div>

      <div className="md:w-1/2 p-4">
        {/* Map container */}
        <div className="h-full">
          <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} onClick={onMapClick}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <AutoCenterMap center={mapCenter} />
            {location.lat && location.lng && (
              <Marker position={[location.lat, location.lng]} icon={customIcon}>
                <Popup>
                  Ваше текущее местоположение.
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Add;
