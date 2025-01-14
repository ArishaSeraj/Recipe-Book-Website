import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/Logo.png';
import logo_burger from '../Assets/Footer_logo_text.png'
import instagram_icon from '../Assets/Instagram Icon.png';
import pinterest_icon from '../Assets/Pinterest Icon.png';
import whatsapp_icon from '../Assets/Whatsapp Icon.png';
import facebook_icon from '../Assets/Facebook Icon.png';
import telegram_icon from '../Assets/Telegram Icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <div className="big_logo-text">
          <p>THE LOS<strong>T</strong><span className="logo-healthy"><img src={logo_burger} alt="" /></span></p>
          <p className="big_logo_sub-text">RECIPE BOOK</p>
        </div>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Recipes</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={facebook_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={telegram_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2025 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer;