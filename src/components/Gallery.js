import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchImages = async () => {
      try {
        const response = await axios.get('https://backend-upqj.onrender.com/api/images');
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  
  const fetchImageUrl = async (imageId) => {
    try {
      const response = await axios.get(`https://backend-upqj.onrender.com/api/images/${imageId}`, {
        responseType: 'arraybuffer',
      });

      const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
      return URL.createObjectURL(imageBlob); // Create object URL for the image
    } catch (error) {
      console.error('Error fetching image by id:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Images</h1>

      {loading && <div>Loading images...</div>}
      {error && <div className="text-danger">{error}</div>}

      <div className="row">
        {images.map((image) => (
          <div key={image.id} className="col-md-4 mb-4">
            <ImageCard imageId={image.id} caption={image.caption} fetchImageUrl={fetchImageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};


const ImageCard = ({ imageId, caption, fetchImageUrl }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch image URL when the imageId changes
    const getImage = async () => {
      const url = await fetchImageUrl(imageId);
      setImageUrl(url);
    };

    getImage();
  }, [imageId, fetchImageUrl]);

  if (!imageUrl) return <div>Loading image...</div>;

  return (
    <div className="card">
      <img src={imageUrl} alt={caption} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{caption}</h5>
      </div>
    </div>
  );
};

export default Gallery;
