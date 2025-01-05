import React, { useState } from 'react';
import Sidebar from './Sidebar.js'; // Import Sidebar component
import './Header.css'; // Import your header styles
import loyImage from './loy.jpg';
import MainContent from './MainContent.js';
import homeimg from './house-door.svg';
import cion from './award.svg';
import gall from './images.svg';
import book from './book.svg';
import telephone from './telephone.svg';
import person from './person.svg';
import bank from './bank.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
function Header() {
  
  const [selectedMenu, setSelectedMenu] = useState('home');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={loyImage} alt="Loyola Polytechnic (YSRR)" />
          <p>Loyola Polytechnic (YSRR)</p>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav-list">
            <li className='nav-item'><a onClick={() => handleMenuClick('home')}><i className="bi bi-house-door-fill"><img src={homeimg}></img> </i>Home</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('course')}> <i className="bi bi-award"><img src={cion} /></i>Courses</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('gallery')}><i className="bi bi-images"><img src={gall} /></i>Gallery</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('admissions')}><i className="bi bi-book"><img src={book} /></i>Admissions</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('contact')}><i className="bi bi-telephone"><img src={telephone} /></i>Contact</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('about')}><i className="bi bi-person"><img src={person} /></i>About Us</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('marks')} >Marks</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('facilities')}><i className="bi bi-bank"><img src={bank} /></i>Facilities</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('admin')}>Admin</a></li>
          </ul>
        </nav>
      </header>

      
      <div className='grid'>
        <Sidebar />
      <MainContent selectedMenu={selectedMenu}/>
      </div>
    </div>
  );
}

export default Header;