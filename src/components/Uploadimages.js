import React, { useState } from 'react';
import axios from 'axios';

const Uploadimages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  // Handle image selection and validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB.');
        return;
      }
      setError('');
      setSelectedImage(file);
    }
  };

  // Handle caption change
  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  // Handle form submission
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
      setUploading(true);
      setProgress(0);
      setError('');
      
      const response = await axios.post('https://backend-upqj.onrender.com/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setProgress(Math.round((loaded / total) * 100));
        }
      });

      alert('Image and text uploaded successfully!');
      setImageUrl(response.data.imageUrl);
    } catch (err) {
      console.error('Error uploading image and caption:', err);
      setError('Error uploading image and caption!');
    } finally {
      setUploading(false);
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
          {error && <div className="text-danger mt-2">{error}</div>}
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

        <button type="submit" className="btn btn-primary w-100" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploading && (
        <div className="mt-3">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="text-center mt-2">{progress}%</div>
        </div>
      )}

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
