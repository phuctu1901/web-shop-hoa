import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.css';

const Contact = () => {
  const [stats, setStats] = useState({
    responseTime: 0,
    satisfaction: 0
  });

  useEffect(() => {
    // Initialize animations and stats
    const timer = setTimeout(() => {
      setStats({
        responseTime: 2,
        satisfaction: 99.9
      });
    }, 1000);

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => toggleFAQ(item));
      }
    });

    return () => {
      clearTimeout(timer);
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
          question.removeEventListener('click', () => toggleFAQ(item));
        }
      });
    };
  }, []);

  const toggleFAQ = (item) => {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-question i');
    const isActive = item.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-question i');
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      }
    });

    // Toggle current item
    if (isActive) {
      item.classList.remove('active');
      answer.style.maxHeight = '0';
      icon.style.transform = 'rotate(0deg)';
    } else {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.style.transform = 'rotate(45deg)';
    }
  };

  const breadcrumb = [
    { text: 'Trang chủ', link: '/' },
    { text: 'Liên hệ' }
  ];

  return (
    <>
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="floating-contacts">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="floating-icon" style={{animationDelay: `${i * 1.2}s`}}>
                <i className={`fas fa-${['phone', 'envelope', 'map-marker-alt', 'comments', 'headset'][i]}`}></i>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="contact-badge">
              <i className="fas fa-headset"></i>
              <span>Hỗ trợ 24/7 - Tư vấn miễn phí</span>
            </div>
            <h1 className="hero-title">Liên hệ với chúng tôi</h1>
            <p className="hero-subtitle">
              Chúng tôi luôn sẵn sàng lắng nghe và mang đến những giải pháp tốt nhất cho bạn
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">{stats.responseTime} phút</div>
                <div className="stat-label">Phản hồi trung bình</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Hỗ trợ liên tục</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.satisfaction}%</div>
                <div className="stat-label">Khách hài lòng</div>
              </div>
            </div>
            
            <nav className="breadcrumb">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {item.link ? (
                    <Link to={item.link}>{item.text}</Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <i className="fas fa-chevron-right"></i>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Thông tin liên hệ</span>
            <h2 className="section-title">Nhiều cách để kết nối với chúng tôi</h2>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card featured">
              <div className="card-badge">Phổ biến</div>
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
                <div className="icon-bg"></div>
              </div>
              <h3 className="contact-title">Gọi điện thoại</h3>
              <div className="contact-details">
                <a href="tel:+84987654321" className="contact-link primary">+84 98 765 4321</a>
                <a href="tel:+842812345678" className="contact-link">028 1234 5678</a>
                <div className="contact-badge">
                  <i className="fas fa-clock"></i>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
              <div className="contact-action">
                <a href="tel:+84987654321" className="btn btn-primary">
                  <i className="fas fa-phone"></i> Gọi ngay
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-comments"></i>
                <div className="icon-bg"></div>
              </div>
              <h3 className="contact-title">Chat trực tiếp</h3>
              <div className="contact-details">
                <div className="social-links">
                  <a href="https://zalo.me/bloomstore" className="social-link zalo">
                    <i className="fas fa-comments"></i>
                    <span>Zalo Official</span>
                  </a>
                  <a href="https://facebook.com/bloomstore" className="social-link facebook">
                    <i className="fab fa-facebook-messenger"></i>
                    <span>Facebook Messenger</span>
                  </a>
                </div>
                <div className="contact-badge">
                  <i className="fas fa-bolt"></i>
                  <span>Phản hồi tức thì</span>
                </div>
              </div>
              <div className="contact-action">
                <a href="https://zalo.me/bloomstore" className="btn btn-outline">
                  <i className="fas fa-comments"></i> Chat Zalo
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
                <div className="icon-bg"></div>
              </div>
              <h3 className="contact-title">Email chúng tôi</h3>
              <div className="contact-details">
                <a href="mailto:hello@bloomstore.vn" className="contact-link primary">hello@bloomstore.vn</a>
                <a href="mailto:support@bloomstore.vn" className="contact-link">support@bloomstore.vn</a>
                <div className="contact-badge">
                  <i className="fas fa-reply"></i>
                  <span>Phản hồi trong 2 giờ</span>
                </div>
              </div>
              <div className="contact-action">
                <a href="mailto:hello@bloomstore.vn" className="btn btn-outline">
                  <i className="fas fa-envelope"></i> Gửi email
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
                <div className="icon-bg"></div>
              </div>
              <h3 className="contact-title">Ghé thăm showroom</h3>
              <div className="contact-details">
                <p className="address">123 Nguyễn Huệ, Quận 1<br/>TP. Hồ Chí Minh</p>
                <div className="contact-badge">
                  <i className="fas fa-clock"></i>
                  <span>8:00 - 22:00 hàng ngày</span>
                </div>
              </div>
              <div className="contact-action">
                <a href="https://maps.google.com/?q=123+Nguyen+Hue+District+1" className="btn btn-outline">
                  <i className="fas fa-directions"></i> Chỉ đường
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="quick-contact">
        <div className="container">
          <div className="quick-contact-grid">
            <div className="quick-contact-content">
              <span className="section-subtitle">Liên hệ nhanh</span>
              <h2 className="section-title">Cần hỗ trợ tư vấn?</h2>
              <p className="section-description">
                Đội ngũ tư vấn viên chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn 
                chọn lựa hoa phù hợp nhất cho mọi dịp đặc biệt.
              </p>
              
              <div className="quick-contact-methods">
                <a href="tel:+84987654321" className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-info">
                    <h4>Gọi điện ngay</h4>
                    <p>+84 98 765 4321</p>
                  </div>
                </a>

                <a href="https://zalo.me/bloomstore" className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <div className="method-info">
                    <h4>Chat qua Zalo</h4>
                    <p>Phản hồi tức thì</p>
                  </div>
                </a>

                <a href="https://facebook.com/bloomstore" className="contact-method">
                  <div className="method-icon">
                    <i className="fab fa-facebook-messenger"></i>
                  </div>
                  <div className="method-info">
                    <h4>Nhắn tin Facebook</h4>
                    <p>Hỗ trợ 24/7</p>
                  </div>
                </a>
              </div>

              <div className="contact-stats">
                <div className="stat-item">
                  <div className="stat-number">2 phút</div>
                  <div className="stat-label">Thời gian phản hồi</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Khách hàng hài lòng</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Hỗ trợ liên tục</div>
                </div>
              </div>
            </div>

            <div className="quick-contact-image">
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=500&fit=crop&crop=center&auto=format&q=80" 
                alt="Customer Service" 
                loading="lazy"
              />
              <div className="contact-highlight">
                <div className="highlight-content">
                  <i className="fas fa-headset"></i>
                  <h4>Tư vấn miễn phí</h4>
                  <p>Đội ngũ chuyên gia sẵn sàng hỗ trợ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Vị trí cửa hàng</span>
            <h2 className="section-title">Ghé thăm showroom BloomStore</h2>
            <p className="section-description">
              Đến trực tiếp cửa hàng để trải nghiệm không gian hoa tươi và được tư vấn tận tình
            </p>
          </div>

          <div className="map-container">
            <div className="map-embed">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326648243056!2d106.69741731527314!3d10.775431892323178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2s!4v1640995200000!5m2!1sen!2s"
                width="100%" 
                height="400" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="BloomStore Location"
              />
            </div>
            
            <div className="map-info">
              <div className="store-info">
                <h3>BloomStore Showroom</h3>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <p><strong>Thứ 2 - Chủ nhật:</strong> 8:00 - 22:00</p>
                    <p><strong>Ngày lễ:</strong> 9:00 - 21:00</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="fas fa-parking"></i>
                  <p>Có bãi đậu xe miễn phí cho khách hàng</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-subway"></i>
                  <p>Cách ga Metro Bến Thành 200m</p>
                </div>
                
                <a href="https://maps.google.com/?q=123+Nguyen+Hue+District+1+Ho+Chi+Minh+City" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn btn-primary">
                  <i className="fas fa-directions"></i> Xem chỉ đường
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Chưa tìm được thông tin bạn cần?</h2>
            <p>Đừng ngần ngại liên hệ trực tiếp với chúng tôi. Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc.</p>
            <div className="cta-actions">
              <a href="tel:+84987654321" className="btn btn-primary">
                <i className="fas fa-phone"></i> Gọi ngay
              </a>
              <a href="https://zalo.me/bloomstore" className="btn btn-outline">
                <i className="fas fa-comments"></i> Chat Zalo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;