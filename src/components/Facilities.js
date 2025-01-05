import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Updated to have an array of objects containing both image path and text for each image
const imageList = [
  { src: "auditorium.jpg", text: "Auditorium" },
  { src: "BOYSHOSTEL.jpg", text: "Hostel for Boys" },
  { src: "cf1.jpg", text: "computer Fundamental Lab" },
  { src: "chemistry2.jpg", text: "Chemistry Lab" },
  { src: "physics1.jpg", text: "Physics Lab" },
  { src: "seminar hall.jpg", text: "Seminar Hall" },
  { src: "gym.jpg", text: "Gym" },
  { src: "library2.jpg", text: "Library" },
  { src: "cmLAB.jpg", text: "Computer Main Lab" },
  { src: "be-cf.jpg", text: "EC lab" },
  { src: "wiring.jpg", text: "Wiring Lab" },
  { src: "survey.jpg", text: "Survey Lab" },
  { src: "workshop.jpg", text: "Workshop" },
  { src: "miningLAB.jpg", text: "Mining Lab" },
];

const Facilities = () => {
  return (
    <div className="container">
      <div className="row">
        {imageList.map((image, index) => (
          <div className="col-md-3" key={index}>
            <div className="card">
              <img
                src={`images/${image.src}`} // Adjust this path if images are elsewhere
                alt={`Image ${index + 1}`}
                className="card-img-top"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="card-body">
                <p className="card-text">{image.text}</p> {/* Display the corresponding text */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
