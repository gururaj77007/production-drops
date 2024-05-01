"use client"
import React, { useState, useEffect } from 'react';
import TaskBar from '../../../components/Home/Taskbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Import Axios

function Page(props) {
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    age: '',
    address: '',
    phoneNumber: '',
    district: '', // Include district field
    taluk: '', 
    yields: [],
    photosURL: '',
    location: {
      type: 'Point',
      coordinates: [0, 0] // Default coordinates
    },
    description: '',
    landDimension: '' 
  });

  useEffect(() => {
    // Fetch current coordinates when component mounts
    getCurrentCoordinates();
  }, []);

  const getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: {
              type: 'Point',
              coordinates: [longitude, latitude] // Reverse the order for MongoDB GeoJSON
            }
          });
        },
        (error) => {
          alert(`Error getting current coordinates: ${error.code}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleYieldChange = (index, e) => {
    const { name, value } = e.target;
    const newYield = { ...formData.yields[index], [name]: value };
    const newYields = [...formData.yields];
    newYields[index] = newYield;
    setFormData({ ...formData, yields: newYields });
  };
  const handleStartDateChange = (date, index) => {
    const newYields = [...formData.yields];
    newYields[index].startMonth = date;
    setFormData({ ...formData, yields: newYields });
  };

  const handleEndDateChange = (date, index) => {
    const newYields = [...formData.yields];
    newYields[index].endMonth = date;
    setFormData({ ...formData, yields: newYields });
  };
  const removeYield = (index) => {
    const newYields = [...formData.yields];
    newYields.splice(index, 1);
    setFormData({ ...formData, yields: newYields });
  };

  const addYield = () => {
    setFormData({
      ...formData,
      yields: [...formData.yields, { name: '', type: '', startMonth: null, endMonth: null, estimatedQuantity: '', permanentOrTemporary: '' }]
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Submit logic here
    console.log(formData);
    await axios.post('https://survey-production.onrender.com/api/supplychain', formData);
    // Reset form after submission
    setFormData({
      beneficiaryName: '',
      age: '',
      address: '',
      phoneNumber: '',
      yields: [],
      photosURL: '',
      district: '', // Reset district field
      taluk: '',
      location: {
        type: 'Point',
        coordinates: [0, 0]
      },
      description: '',
      landDimension: '' 
    });
  };

  return (
    <div className='h-screen'>
      <TaskBar />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 px-4">
        <h2 className="text-3xl mb-6 font-bold text-center text-black">Supply Chain Form</h2>
        <div className="mb-4">
          <label className="block mb-2 text-black ">Beneficiary Name</label>
          <input
            type="text"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
            className="w-full border text-black rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border text-black rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Land Dimension (in acres)</label>
          <input
            type="number"
            name="landDimension"
            value={formData.landDimension}
            onChange={handleChange}
            placeholder="Enter Land Dimension"
            className="w-full text-black border rounded py-2 px-3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-black mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full text-black border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full text-black border rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Taluk</label>
          <input
            type="text"
            name="taluk"
            value={formData.taluk}
            onChange={handleChange}
            className="w-full text-black border rounded py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Location</label>
          <p className='text-black'>Latitude: {formData.location.coordinates[1]}</p>
          <p className='text-black'>Longitude: {formData.location.coordinates[0]}</p>
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full text-black border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-black mb-2">Yields</label>
          {formData.yields.map((yieldItem, index) => (
            <div key={index} className="mb-4">
              <select
                name="name"
                value={yieldItem.name}
                onChange={(e) => handleYieldChange(index, e)}
                className="w-full text-black border rounded py-2 px-3 mb-2"
              >
                <option className='text-black' value="">Select Crop</option>
                <option className='text-black' value="Cocount">Cocount</option>
                <option className='text-black' value="Areca">Areca</option>
                <option className='text-black' value="Banana">Banana</option>
                <option className='text-black' value="Betel">Betel</option>
                <option className='text-black' value="Black pepper">Black pepper</option>
                <option className='text-black' value="Other">Other (Enter Manually)</option>
              </select>
              {yieldItem.name === 'Other' && (
                <input
                  type="text"
                  name="customCropName"
                  value={yieldItem.customCropName || ''}
                  onChange={(e) => handleYieldChange(index, e)}
                  placeholder="Enter Custom Crop Name"
                  className="w-full text-black border rounded py-2 px-3 mb-2"
                  autoFocus // Automatically focuses on this input field
                />
              )}
              <input
                type="text"
                name="type"
                value={yieldItem.type}
                onChange={(e) => handleYieldChange(index, e)}
                placeholder="Type"
                className="w-full text-black border rounded py-2 px-3 mb-2"
              />
              <input
                type="number"
                name="estimatedQuantity"
                value={yieldItem.estimatedQuantity}
                onChange={(e) => handleYieldChange(index, e)}
                placeholder="Estimated Quantity"
                className="w-full text-black border rounded py-2 px-3 mb-2"
              />
              <div className="flex mb-2">
                <DatePicker
                  selected={yieldItem.startMonth}
                  onChange={(date) => handleStartDateChange(date, index)}
                  placeholderText="Start Month"
                  className="flex-1 text-black border rounded py-2 px-3 mr-2"
                />
                <DatePicker
                  selected={yieldItem.endMonth}
                  onChange={(date) => handleEndDateChange(date, index)}
                  placeholderText="End Month"
                  className="flex-1 text-black border rounded py-2 px-3"
                />
              </div>
              <input
                type="text"
                name="permanentOrTemporary"
                value={yieldItem.permanentOrTemporary}
                onChange={(e) => handleYieldChange(index, e)}
                placeholder="Permanent or Temporary"
                className="w-full bordertext-black rounded py-2 px-3 mb-2"
              />
              <button
                type="button"
                onClick={() => removeYield(index)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Remove Yield
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addYield}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Yield
          </button>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
