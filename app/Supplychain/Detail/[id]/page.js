"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'next/image';
import TaskBar from '../../../../components/Home/Taskbar';
import { useRouter } from 'next/navigation'

 function Page({ params }) {
  const [supplyChainData, setSupplyChainData] = useState(null);
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    age: 0,
    address: '',
    district: '',
    taluk: '',
    photosURL: '',
    description: '',
    landDimension: 0,
    location: {
        type: 'Point',
        coordinates: [0, 0]
      },
    yields: []
  });
  const [editMode, setEditMode] = useState(false); // Toggle between edit mode and view mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://survey-production.onrender.com/api/supplychain/${params.id}`);
        setSupplyChainData(response.data);
        setFormData(response.data); // Set form data with fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const openGoogleMaps = () => {
    console.log(supplyChainData.location)
    
   
      window.open(`https://www.google.com/maps/search/?api=1&query=${formData.location.coordinates[1]},${formData.location.coordinates[0]}`, '_blank');
    
  };
  const handleGetNewLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          });
          alert("succefully chaged address")
        },
        (error) => {
          alert(`Error getting current coordinates: ${error.code}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://survey-production.onrender.com/api/supplychain/${params.id}`, formData);
      alert('Supply chain data updated successfully');
      setEditMode(false); // Switch back to view mode after submitting
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating supply chain data. Please try again later.');
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const photos=["https://picsum.photos/id/237/200/300","https://picsum.photos/id/237/200/300","https://picsum.photos/id/237/200/300"]
  return (
    <div className=' '>
        <TaskBar></TaskBar>
        
         <div className="container mx-auto px-4 mt-8">
         
      {loading ? (
        <div className="text-center text-gray-700 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <Slider {...settings}>
          {photos.map((photo, index) => (
              <div key={index} className="flex items-center justify-center bg-gray-200 h-64">
                <img
                  className="object-cover object-center h-64"
                  src={photo}
                  alt={`Supply Chain Image ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
          <div className="p-6">
            {!editMode ? (
              <>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{supplyChainData.beneficiaryName}</h1>
                <p className="text-gray-700 text-base mb-3">Age: {supplyChainData.age}</p>
                <p className="text-gray-700 text-base mb-3">Address: {supplyChainData.address}</p>
                <p className="text-gray-700 text-base mb-3">District: {supplyChainData.district}</p>
                <p className="text-gray-700 text-base mb-3">Taluk: {supplyChainData.taluk}</p>
                <p className="text-gray-700 text-base mb-3">Description: {supplyChainData.description}</p>
                <p className="text-gray-700 text-base mb-3">Land Dimension: {supplyChainData.landDimension}</p>
                <div className="mb-3">
                  <h2 className="text-2xl font-semibold mb-1">Yields</h2>
                  {supplyChainData.yields.map((yieldItem, index) => (
                    <div key={index} className="flex justify-between mb-1">
                      <p className="text-gray-700">{yieldItem.name}</p>
                      <p className="text-gray-700">{yieldItem.estimatedQuantity}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                    onClick={openGoogleMaps}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ml-2"
                  >
                    Open in Google Maps
                  </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="beneficiaryName"
                  value={formData.beneficiaryName}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Beneficiary Name"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Age"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="District"
                />
                <input
                  type="text"
                  name="taluk"
                  value={formData.taluk}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Taluk"
                />
                <input
                  type="text"
                  name="photosURL"
                  value={formData.photosURL}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Photo URL"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="landDimension"
                  value={formData.landDimension}
                  onChange={handleChange}
                  className="w-full mb-4 p-2 border rounded"
                  placeholder="Land Dimension"
                />
                {formData.yields.map((yieldItem, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name={`yields[${index}].name`}
                      value={yieldItem.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Yield Name"
                    />
                    <input
                      type="number"
                      name={`yields[${index}].estimatedQuantity`}
                      value={yieldItem.estimatedQuantity}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border rounded"
                      placeholder="Estimated Quantity"
                    />
                    <input
                      type="text"
                      name={`yields[${index}].permanentOrTemporary`}
                      value={yieldItem.permanentOrTemporary}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border rounded"
                      placeholder="Permanent or Temporary"
                    />
                    <button
      type="button"
      onClick={() => {
        const updatedYields = [...formData.yields];
        updatedYields.splice(index, 1); // Remove the item at the specified index
        setFormData({ ...formData, yields: updatedYields }); // Update form data
      }}
      className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600"
    >
      Remove
    </button>
                  </div>
                ))}
                <div className="mb-4">
      <label className="block text-gray-700 mb-2">Coordinates</label>
      <input
        type="text"
        className="w-full bg-gray-200 p-2 border rounded"
        value={`Latitude: ${formData.location.coordinates[1]}, Longitude: ${formData.location.coordinates[0]}`}
        disabled
      />
    </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, yields: [...formData.yields, { name: '', estimatedQuantity: 0, permanentOrTemporary: '' }] })}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Add Yield
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">Submit</button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-4 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <div
      onClick={handleGetNewLocation}
      className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
    >
      Get Current Location
    </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
   
  );
}

export default Page