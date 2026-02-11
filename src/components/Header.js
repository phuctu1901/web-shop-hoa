import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import api from '../api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

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
              {settings.logo_url ? (
                <img src={api.imageUrl(settings.logo_url)} alt={settings.shop_name} style={{ height: '40px', marginRight: '8px' }} />
              ) : null}
              <h1>{settings.shop_name || ''}</h1>
              <span className="logo-tagline">{settings.slogan || ''}</span>
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
              <Link to="/gallery" className={`nav-link ${isActive('/gallery')}`}>
                Bộ sưu tập
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
              {settings.zalo_url && (
                <a href={settings.zalo_url} className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-comments"></i>
                </a>
              )}
              {settings.facebook_url && (
                <a href={settings.facebook_url} className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
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