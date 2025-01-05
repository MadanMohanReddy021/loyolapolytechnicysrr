import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayAllImages = () => {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    // Fetch all images from the backend
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://warp-dusty-jingle.glitch.me/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container">
      <h1>All Uploaded Images</h1>
      <div className="row">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img
                  src={image.imageUrl}
                  className="card-img-top"
                  alt={image.caption}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{image.caption}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No images to display.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayAllImages;
