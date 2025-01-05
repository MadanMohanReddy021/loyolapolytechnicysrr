import React from 'react';
import './Sidebar.css'; 
import Courses from './Courses.js';
import Gallery from './Gallery.js' ;
import ContactPage from './ContactPage.js';
import HistoryPage from './HistoryPage.js';
import HomePage from './HomePage.js';
import Facilities from './Facilities.js';
import Admin from './Admin.js';
import Getmarks from './Getmarks.js';
function MainContent({selectedMenu}) {
  const renderMainContent = () => {
    switch (selectedMenu) {
      case 'home':
        return (<HomePage />);
      case 'course':
        return(<Courses />);
        case 'gallery':
        return(<Gallery />);
        case 'contact':
          return(<ContactPage />);
          case 'about':
          return(<HistoryPage />);
          case 'admin':
          return(<Admin /> );
          case 'facilities':
            return( <Facilities /> );
            case 'marks':
            return( <Getmarks /> );
      default:
        return <p>Select a menu item to view content.</p>;
    }
  
  };
   return (
      <div >
        {renderMainContent()}
      </div>
    );
};

export default MainContent;