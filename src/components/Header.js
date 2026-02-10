import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <h1>BloomStore</h1>
              <span className="logo-tagline">Premium Flowers</span>
            </Link>
          </div>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={`nav-link ${isActive('/products')}`}>
                Sản phẩm
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className={`nav-link ${isActive('/services')}`}>
                Dịch vụ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                Liên hệ
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <div className="nav-social">
              <a href="https://zalo.me/bloomstore" className="social-link">
                <i className="fas fa-comments"></i>
              </a>
              <a href="https://facebook.com/bloomstore" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/bloomstore" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <button 
              className={`btn-menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;