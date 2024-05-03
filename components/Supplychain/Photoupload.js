"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const PhotoUploader = ({id}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = async () => {
    try {
      if (!file) {
        alert('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('photo', file);
      formData.append('id', id);

      // You can add additional metadata to the form data if needed, e.g., formData.append('description', 'This is a photo');

      const response = await axios.post('https://survey-production.onrender.com/api/supplychain/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("succefully uploaded")
    } catch (error) {
      alert(`${error}`)
      console.error('Error uploading photo:', error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    // Read the selected file and set the preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h2>Photo Uploader</h2>
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={{ border: '1px solid #ccc', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag & drop a photo here, or click to select a photo</p>
          </div>
        )}
      </Dropzone>
      {preview && (
        <div>
          <h3>Preview</h3>
          <img src={preview} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
      <button onClick={handleFileUpload}>Upload Photo</button>
    </div>
  );
};

export default PhotoUploader;
