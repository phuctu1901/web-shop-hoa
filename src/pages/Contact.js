import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import '../styles/contact.css';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('sent');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(null), 4000);
    }, 1500);
  };

  const shopName = settings.shop_name || '';
  const phone = settings.phone || '';
  const email = settings.email || '';
  const address = settings.address || '';

  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero-v2">
        <div className="contact-hero-bg">
          <div className="hero-gradient-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="container">
          <div className="contact-hero-inner">
            <nav className="breadcrumb-nav">
              <Link to="/">Trang chủ</Link>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">Liên hệ</span>
            </nav>
            <h1 className="contact-hero-title">
              Kết nối với <span className="text-gradient">{shopName}</span>
            </h1>
            <p className="contact-hero-desc">
              Chúng tôi luôn sẵn sàng lắng nghe và mang đến giải pháp hoa tươi hoàn hảo cho bạn
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards Strip */}
      <section className="contact-cards-strip">
        <div className="container">
          <div className="cards-row">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="mini-card">
              <div className="mini-card-icon phone-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="mini-card-info">
                <h4>Hotline</h4>
                <p>{phone}</p>
              </div>
              <i className="fas fa-arrow-right mini-card-arrow"></i>
            </a>

            <a href={`mailto:${email}`} className="mini-card">
              <div className="mini-card-icon email-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="mini-card-info">
                <h4>Email</h4>
                <p>{email}</p>
              </div>
              <i className="fas fa-arrow-right mini-card-arrow"></i>
            </a>

            <a href={settings.zalo_url || '#'} className="mini-card" target="_blank" rel="noopener noreferrer">
              <div className="mini-card-icon zalo-icon">
                <i className="fas fa-comments"></i>
              </div>
              <div className="mini-card-info">
                <h4>Zalo Chat</h4>
                <p>Phản hồi tức thì</p>
              </div>
              <i className="fas fa-arrow-right mini-card-arrow"></i>
            </a>

            <div className="mini-card">
              <div className="mini-card-icon location-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="mini-card-info">
                <h4>Showroom</h4>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Contact Info */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main-grid">
            {/* LEFT: Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-header">
                <span className="form-label">Gửi tin nhắn</span>
                <h2>Chúng tôi sẽ phản hồi trong <strong>2 giờ</strong></h2>
                <p>Điền thông tin bên dưới và đội ngũ tư vấn sẽ liên hệ bạn sớm nhất.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Họ và tên <span className="required">*</span></label>
                    <input
                      type="text" id="name" name="name"
                      placeholder="Nguyễn Văn A"
                      value={formData.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input
                      type="email" id="email" name="email"
                      placeholder="email@example.com"
                      value={formData.email} onChange={handleChange} required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="tel" id="phone" name="phone"
                      placeholder="0912 345 678"
                      value={formData.phone} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Chủ đề</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Chọn chủ đề</option>
                      <option value="order">Đặt hoa</option>
                      <option value="custom">Thiết kế theo yêu cầu</option>
                      <option value="event">Trang trí sự kiện</option>
                      <option value="delivery">Giao hàng</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label htmlFor="message">Nội dung tin nhắn <span className="required">*</span></label>
                  <textarea
                    id="message" name="message" rows="5"
                    placeholder="Mô tả yêu cầu của bạn..."
                    value={formData.message} onChange={handleChange} required
                  />
                </div>
                <button
                  type="submit"
                  className={`submit-btn ${formStatus === 'sending' ? 'loading' : ''} ${formStatus === 'sent' ? 'success' : ''}`}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' && (
                    <><i className="fas fa-spinner fa-spin"></i> Đang gửi...</>
                  )}
                  {formStatus === 'sent' && (
                    <><i className="fas fa-check"></i> Đã gửi thành công!</>
                  )}
                  {(!formStatus || formStatus === 'error') && (
                    <><i className="fas fa-paper-plane"></i> Gửi tin nhắn</>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT: Info Sidebar */}
            <div className="contact-sidebar">
              <div className="sidebar-card hours-card">
                <div className="sidebar-card-header">
                  <i className="fas fa-clock"></i>
                  <h3>Giờ làm việc</h3>
                </div>
                <ul className="hours-list">
                  <li>
                    <span>Thứ 2 — Thứ 6</span>
                    <span className="hours-time">8:00 — 21:00</span>
                  </li>
                  <li>
                    <span>Thứ 7 — Chủ nhật</span>
                    <span className="hours-time">9:00 — 20:00</span>
                  </li>
                  <li>
                    <span>Ngày lễ</span>
                    <span className="hours-time">9:00 — 18:00</span>
                  </li>
                </ul>
                <div className="open-status">
                  <span className="status-dot"></span>
                  Đang mở cửa
                </div>
              </div>

              <div className="sidebar-card social-card">
                <div className="sidebar-card-header">
                  <i className="fas fa-share-alt"></i>
                  <h3>Theo dõi chúng tôi</h3>
                </div>
                <div className="social-grid">
                  <a href={settings.facebook_url || '#'} className="social-item facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </a>
                  <a href={settings.instagram_url || '#'} className="social-item instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                    <span>Instagram</span>
                  </a>
                  <a href={settings.zalo_url || '#'} className="social-item zalo" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-comments"></i>
                    <span>Zalo</span>
                  </a>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="social-item phone">
                    <i className="fas fa-phone-alt"></i>
                    <span>Gọi ngay</span>
                  </a>
                </div>
              </div>

              <div className="sidebar-card trust-card">
                <div className="trust-items">
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fas fa-shipping-fast"></i></div>
                    <span>Giao hàng miễn phí nội thành</span>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fas fa-shield-alt"></i></div>
                    <span>Cam kết hoa tươi 100%</span>
                  </div>
                  <div className="trust-item">
                    <div className="trust-icon"><i className="fas fa-undo"></i></div>
                    <span>Đổi trả miễn phí trong 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="container">
          <div className="map-header">
            <span className="section-label">Vị trí cửa hàng</span>
            <h2>Ghé thăm showroom <span className="text-gradient">{shopName}</span></h2>
          </div>
          <div className="map-layout">
            <div className="map-embed-wrapper">
              <iframe
                src={settings.google_map_url || ""}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Store Location"
              />
            </div>
            <div className="map-details">
              <div className="map-detail-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Địa chỉ</strong>
                  <p>{address}</p>
                </div>
              </div>
              {settings.phone && (
                <div className="map-detail-item">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <strong>Hotline</strong>
                    <p>{phone}</p>
                  </div>
                </div>
              )}
              {settings.email && (
                <div className="map-detail-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <p>{email}</p>
                  </div>
                </div>
              )}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank" rel="noopener noreferrer"
                className="directions-btn"
              >
                <i className="fas fa-directions"></i> Chỉ đường đến cửa hàng
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;