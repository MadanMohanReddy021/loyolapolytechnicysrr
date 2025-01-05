import React, { useState } from 'react';
import axios from 'axios';

const Uploadimages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage || !caption) {
      alert('Please select an image and enter a caption.');
      return;
    }

    // Create FormData to send the image and caption
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('caption', caption);

    try {
      // Send the image and caption to the backend
      const response = await axios.post('https://backend-upqj.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image and text uploaded successfully!');
      setImageUrl(response.data.imageUrl); 
    } catch (error) {
      console.error('Error uploading image and caption:', error);
      alert('Error uploading image and caption!');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Upload Image with Text</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">Choose an Image</label>
          <input
            type="file"
            id="imageInput"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="captionInput" className="form-label">Enter Caption</label>
          <input
            type="text"
            id="captionInput"
            className="form-control"
            placeholder="Enter caption"
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Upload</button>
      </form>

      {imageUrl && (
        <div className="mt-4 text-center">
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" className="img-fluid rounded" width="300" />
        </div>
      )}
    </div>
  );
};

export default Uploadimages;
