"use client"
import React, { useState ,useMemo} from 'react';
import TaskBar from '../../../components/Home/Taskbar';
import axios from 'axios';
import Select from 'react-select'
import countryList from 'react-select-country-list'

function Page() {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    products: [],
    contactInformation: [],
  });
  const options = useMemo(() => countryList().getData(), [])
  const [value, setValue] = useState('')
  const [activeother,setactiveother]=useState(false)
  const contactTypes = ['Email', 'WhatsApp Number', 'WeChat', 'Other'];
  const [productOptions, setProductOptions] = useState([
    { value: 'Cocount', label: 'Cocount' },
    { value: 'Areca', label: 'Areca' },
    { value: 'Banana', label: 'Banana' },
    { value: 'Betel', label: 'Betel' },
    { value: 'Black pepper', label: 'Black pepper' }
  ]);
  const [productValue, setProductValue] = useState([]);
  const [customProduct, setCustomProduct] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const changeHandler = value => {
    console.log(value)
    setFormData({...formData,country:value.label})
    setValue(value)
    console.log(formData)
  }
  const handleProductChange = (selectedOptions) => {
    setProductValue(selectedOptions);
    const selectedProducts = selectedOptions.map(option => option.value);
    setFormData({ ...formData, products: selectedProducts });
  };

  const handleCustomProductChange = (e) => {
    setCustomProduct(e.target.value);
  };

  const addCustomProduct = () => {
    if (customProduct.trim() !== '') {
      const newProduct = { value: customProduct, label: customProduct };
      setProductOptions([...productOptions, newProduct]);
      setProductValue([...productValue, newProduct]);
      setFormData({ ...formData, products: [...formData.products, customProduct] });
      setCustomProduct('');
    }
  };
  const handleContactTypeChange = (index, selectedType) => {
   
        const updatedContactInfo = [...formData.contactInformation];
    updatedContactInfo[index].type = selectedType;
    setFormData({ ...formData, contactInformation: updatedContactInfo });

    
  };
  const othercontactypechange=(index, selectedType)=>{
    const updatedContactInfo = [...formData.contactInformation];
    updatedContactInfo[index].label = selectedType;
    setFormData({ ...formData, contactInformation: updatedContactInfo });

  }

  const handleContactValueChange = (index, value) => {
    const updatedContactInfo = [...formData.contactInformation];
    updatedContactInfo[index].value = value;
    setFormData({ ...formData, contactInformation: updatedContactInfo });
  };

  const handleAddContactInfo = () => {
    setFormData({
      ...formData,
      contactInformation: [...formData.contactInformation, { type: '', value: '' }],
    });
  };

  const handleRemoveContactInfo = (index) => {
    const updatedContactInfo = [...formData.contactInformation];
    updatedContactInfo.splice(index, 1);
    setFormData({ ...formData, contactInformation: updatedContactInfo });
  };

  const removeProduct = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, products: updatedProducts });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData)
      const response = await axios.get('http://localhost:3021/api/buyer/createBuyerProfile', { params: formData });
      console.log(response.data);
      alert('Buyer profile created successfully');
      // You can redirect or do any other action upon successful creation
    } catch (error) {
      console.error(error);
      alert('Failed to create buyer profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TaskBar />
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
            <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="mb-4">
          
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            
            <Select options={options} value={value} onChange={changeHandler} />
          </div>

          
          <div className="mb-4">
            <label htmlFor="products" className="block text-gray-700 text-sm font-bold mb-2">Products</label>
            <Select options={productOptions} value={productValue} onChange={handleProductChange} isMulti />
            <div className="mt-2">
              <input
                type="text"
                value={customProduct}
                onChange={handleCustomProductChange}
                placeholder="Enter Product Manually"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button type="button" onClick={addCustomProduct} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add</button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="contactInformation" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Information
            </label>
            {formData.contactInformation.map((contact, index) => (
              <div key={index} className="flex mb-2">
                <Select
                  options={contactTypes.map((type) => ({ value: type, label: type }))}
                  value={{ value: contact.type, label: contact.type }}
                  onChange={(selectedOption) => handleContactTypeChange(index, selectedOption.value)}
                  className="w-1/2 mr-2"
                />
                {contact.type === 'Other' ? (
                  <input
                    type="text"
                    value={contact.label}
                    onChange={(e) => othercontactypechange(index, e.target.value)}
                    placeholder="Enter Custom Type"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  />
                ) : (
                  <></>
                )}
                <input
                    type="text"
                    value={contact.value}
                    onChange={(e) => handleContactValueChange(index, e.target.value)}
                    placeholder="Value"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                  />
                <button
                  type="button"
                  onClick={() => handleRemoveContactInfo(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddContactInfo}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Add Contact Info
            </button>
          </div>

          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
