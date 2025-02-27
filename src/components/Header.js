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
import { FaBars } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';
function Header() {
  
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [isNavActive, setIsNavActive] = useState(false);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    // Optionally close the nav after a menu item is clicked on mobile
    if (window.innerWidth <= 768) {
        setIsNavActive(false);
    }
  };
  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={loyImage} alt="Loyola Polytechnic (YSRR)" />
          <p>Loyola Polytechnic (YSRR)</p>
          <button id="menu" onClick={toggleNav}><FaBars size={20} /></button>
        </div>
        {/* Navigation Menu */}
        <nav id="navlist">
          <ul className={`nav-list ${isNavActive ? 'active' : ''}`}>
            <li className='nav-item'><a onClick={() => handleMenuClick('home')}><i className="bi bi-house-door-fill"><img src={homeimg} alt="home"/> </i>Home</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('course')}> <i className="bi bi-award"><img src={cion} alt="course" /></i>Courses</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('gallery')}><i className="bi bi-images"><img src={gall} alt="gall"/></i>Gallery</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('Admission')}>Admissions</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('about')}><i className="bi bi-person"><img src={person} alt="person" /></i>About Us</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('marks')} >Marks</a></li>
            <li className='nav-item'><a onClick={() => handleMenuClick('facilities')}><i className="bi bi-bank"><img src={bank} alt="bank"/></i>Facilities</a></li>
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
