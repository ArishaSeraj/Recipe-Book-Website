import React, { useState } from 'react';
import './Header.css';
import logo_icon from '../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
const Header = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
    return (
       <div className="header">
        <div className="header-logo">
           <img src={logo_icon} alt="Logo" />     
        </div>
        <div className="header-search">
            <input 
             type="text"
             placeholder="Search recipes..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        <ul className="header-nav">
        <li
          onClick={() => setActiveMenu("Home")}
          className={activeMenu === "Home" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/'>Home</Link>
        </li>
        <li
          onClick={() => setActiveMenu("BreakFast")}
          className={activeMenu === "BreakFast" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/BreakFast'>BreakFast</Link>
        </li>
        <li
          onClick={() => setActiveMenu("Lunch")}
          className={activeMenu === "Lunch" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/Lunch'>Lunch</Link>
        </li>
        <li
          onClick={() => setActiveMenu("Dinner")}
          className={activeMenu === "Dinner" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/Dinner'>Dinner</Link>
        </li>
        <li
          onClick={() => setActiveMenu("Dessert")}
          className={activeMenu === "Dessert" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/Dessert'>Dessert</Link>
        </li>
        <li
          onClick={() => setActiveMenu("Snacks")}
          className={activeMenu === "Snacks" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/Snacks'>Snacks</Link>
        </li>
        <li
          onClick={() => setActiveMenu("Beverages")}
          className={activeMenu === "Beverages" ? "active" : ""}
        >
          <Link style={{textDecoration: 'none', color: 'green', transition: 'color 0.3s ease'}} to='/Beverages'>Beverages</Link>
        </li>
        </ul>
       </div>
    );
}

export default Header;