import React from 'react';
import PublicationCard from '../components/PublicationCard';
import { IoArrowDown } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-56">
          <div className="w-full h-full bg-gray-300">

          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-semibold text-gray-900">Kamoliddin Mukhamedov</h2>
        </div>

        {/* Profile Sections */}
        <div className="mt-8">
          <div className="flex justify-around border-t border-gray-200">
            <button className="w-full py-4 bg-green-500 shadow-md shadow-green-700 text-white flex items-center gap-2 justify-center">My Posts <IoArrowDown /></button>
          </div>
        </div>

        <div className='posts py-5 mb-12 space-y-5'>
          <PublicationCard/>
          <PublicationCard/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
