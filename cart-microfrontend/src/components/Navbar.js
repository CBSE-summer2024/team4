import React from 'react';
import './Navbar.css';
import logo from 'C:/Users/yazeed/cart-microfrontend/src/assets/images/logo.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Mart.ps Logo" className="logo-image" />
      </div>
      <ul className="navbar-links">
        <li><a href="/">الرئيسية</a></li>
        <li><a href="/deals">Super Deals</a></li>
        <li><a href="/new">وصلنا حديثاً</a></li>
        <li><a href="/policies">سياسات الشركة</a></li>
        <li><a href="/faq">أسئلة شائعة</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
