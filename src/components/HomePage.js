import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
    

      {/* About Section */}
      <section className="about">
        <h2>History Of Our College</h2>
        <p>
          This college was founded by Sri. Y.S. Raja Reddy Educational Trust in 1979 and was affiliated to Sri Venkateswara University. Late Chief Minister of Andhra Pradesh Sri. Y. S. Raja Sekhara Reddy (Alumni of Andhra Loyola College, Vijayawada) approached Loyola (Jesuit) Fathers in 1993 to take over the institution. From 1993 to 1998, the college was administered by the Jesuits on an experimental basis. Then they decided to take over the institution.
        </p>

        <div className="vision-mission">
          {/* Vision Section */}
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              To produce World-class Engineers for converting global challenges into opportunities through, "Value Embedded Quality Technical Education", and to develop this College as an Academy of Higher Learning in the field of Engineering & Technology.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              To impart Technical education and training to the poor and most backward students of Rayalaseema to develop their holistic Personality and to prepare them for work and life, equipping them to be life-long learners and to contribute to the technological, economic, and social development of India.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <h2>Our Programs</h2>

        <div className="course-list">
          <div className="course-item">
            <h3>Diploma Courses</h3>
            <ul>
              <li>Diploma in Computer Engg.</li>
              <li>Diploma in Electronics and Communications Engg.</li>
              <li>Diploma in Electrical and Electronics Engg.</li>
              <li>Diploma in Civil Engg.</li>
              <li>Diploma in Mechanical Engg.</li>
              <li>Diploma in Mining Engg.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
