import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Branch from './Branch.js';
import cme from './cme.jpg';
import ece from './ece.jpg';
import eee from './eee.jpg';
import civil from './civil.jpg';
import mech from './mech.jpg';
import mining from './mining.jpg';

function Courses() {
const handleCardClick = (course) => {
    setSelectedCourse(course); 
    console.log(course);
  };
  const [selectedCourse, setSelectedCourse] = useState(null);

 
  
  const courses = [
    { id: 1, name: 'Computer Engineering',img:cme},
    { id: 2, name: 'Electronics & Communication Engineering' ,img:ece},
    { id: 3, name: 'Electrical & Electronics Engineering',img:eee},
    { id: 4, name: 'Civil Engineering',img:civil },
    { id: 5, name: 'Mechanical Engineering',img:mech },
    { id: 6, name: 'Mining Engineering' ,img:mining},
  ];

 

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Courses</h4>

      
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-2 col-4 mb-4" key={course.id}>
            <div
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(course.id)}
            >
              <img
                className="card-img-top img-fluid"
                src={course.img}
                alt={course.name}
                style={{ height: '150px', objectFit: 'cover' }} // Adjust image size
              />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
        <Branch selectedCourse={selectedCourse} />
    </div>
  );
}

export default Courses;
