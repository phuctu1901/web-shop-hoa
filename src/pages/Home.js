import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    // Hero animations
    const heroElements = document.querySelectorAll('.animate-hero');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Stats animation
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // Cleanup
    return () => {
      if (statsSection) {
        statsObserver.unobserve(statsSection);
      }
    };
  }, []);

  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 20);
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1 className="hero-title">
                Mang vẻ đẹp thiên nhiên
                <span className="highlight"> vào cuộc sống</span>
              </h1>
              <p className="hero-description">
                Khám phá bộ sưu tập hoa tươi cao cấp được tuyển chọn kỹ lưỡng,
                thiết kế tinh tế cho những dịp đặc biệt trong cuộc sống của bạn.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary">Khám phá ngay</Link>
                <Link to="/products" className="btn btn-outline">Xem bộ sưu tập</Link>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1000</span>
                <span className="stat-label">Khách hàng tin tưởng</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500</span>
                <span className="stat-label">Mẫu hoa độc đáo</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24</span>
                <span className="stat-label">Giao hoa tận nơi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-number">500</div>
              <div className="stat-label">Khách hàng hạnh phúc</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-truck"></i>
              </div>
              <div className="stat-number">1000</div>
              <div className="stat-label">Đơn hàng thành công</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="stat-number">5</div>
              <div className="stat-label">Năm kinh nghiệm</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="stat-number">50</div>
              <div className="stat-label">Loại hoa khác nhau</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="featured-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Sản phẩm nổi bật</span>
            <h2 className="section-title">Bộ sưu tập hoa tươi cao cấp</h2>
            <p className="section-description">
              Từng bông hoa được chọn lọc kỹ càng, tạo nên những tác phẩm nghệ thuật tuyệt đẹp
            </p>
          </div>

          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop" alt="Hoa cưới romantic" />
                <div className="product-overlay">
                  <Link to="/products/1" className="btn-quick-view">Xem chi tiết</Link>
                  <a href="https://zalo.me/bloomstore" className="btn-contact">Liên hệ đặt hàng</a>
                </div>
                <span className="product-badge">Bán chạy</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Bó hoa cưới Romantic</h3>
                <div className="product-price">
                  <span className="price-current">1.200.000đ</span>
                  <span className="price-original">1.500.000đ</span>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop" alt="Hoa sinh nhật" />
                <div className="product-overlay">
                  <Link to="/products/2" className="btn-quick-view">Xem chi tiết</Link>
                  <a href="https://zalo.me/bloomstore" className="btn-contact">Liên hệ đặt hàng</a>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">Bó hoa sinh nhật rực rỡ</h3>
                <div className="product-price">
                  <span className="price-current">800.000đ</span>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop" alt="Hoa kỷ niệm" />
                <div className="product-overlay">
                  <Link to="/products/3" className="btn-quick-view">Xem chi tiết</Link>
                  <a href="https://zalo.me/bloomstore" className="btn-contact">Liên hệ đặt hàng</a>
                </div>
                <span className="product-badge new">Mới</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">Hộp hoa kỷ niệm</h3>
                <div className="product-price">
                  <span className="price-current">1.800.000đ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-actions">
            <Link to="/products" className="btn btn-primary">Xem tất cả sản phẩm</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Dịch vụ của chúng tôi</span>
            <h2 className="section-title">Trải nghiệm dịch vụ hoàn hảo</h2>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="service-title">Giao hàng nhanh chóng</h3>
              <p className="service-description">Giao hoa tận nơi trong vòng 2 giờ, đảm bảo độ tươi mới tuyệt đối</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3 className="service-title">Thiết kế theo yêu cầu</h3>
              <p className="service-description">Tư vấn và thiết kế hoa theo ý tưởng riêng của khách hàng</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="service-title">Đặt hoa định kỳ</h3>
              <p className="service-description">Dịch vụ đặt hoa tự động theo lịch cho doanh nghiệp và cá nhân</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="service-title">Trang trí sự kiện</h3>
              <p className="service-description">Trang trí hoa cho đám cưới, hội nghị và các sự kiện đặc biệt</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3 className="service-title">Tư vấn chăm sóc hoa</h3>
              <p className="service-description">Hướng dẫn chăm sóc và bảo quản hoa để giữ được vẻ đẹp lâu nhất</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="service-title">Hoa tươi nhập khẩu</h3>
              <p className="service-description">Cung cấp các loài hoa nhập khẩu cao cấp từ Hà Lan, Ecuador và Colombia</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-subtitle">Về BloomStore</span>
              <h2 className="section-title">Hành trình tạo nên những khoảnh khắc đẹp</h2>
              <p className="about-description">
                Với hơn 10 năm kinh nghiệm trong ngành hoa tươi, BloomStore tự hào mang đến
                những sản phẩm hoa cao cấp và dịch vụ chuyên nghiệp nhất. Chúng tôi hiểu rằng
                mỗi bông hoa đều chứa đựng một thông điệp riêng, và sứ mệnh của chúng tôi là
                giúp bạn truyền tải những cảm xúc đó một cách hoàn hảo nhất.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <i className="fas fa-leaf"></i>
                  <span>100% hoa tươi nhập khẩu</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-award"></i>
                  <span>Đội ngũ florist chuyên nghiệp</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-heart"></i>
                  <span>Cam kết chất lượng cao nhất</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop" alt="Về BloomStore" />
              <div className="about-badge">
                <span className="badge-number">10+</span>
                <span className="badge-text">Năm kinh nghiệm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Khách hàng nói gì</span>
            <h2 className="section-title">Những chia sẻ chân thành</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "Dịch vụ tuyệt vời! Hoa được giao đúng giờ và còn đẹp hơn cả trong hình.
                Chắc chắn sẽ quay lại BloomStore cho những dịp đặc biệt khác."
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Nguyễn Minh Anh" />
                <div className="author-info">
                  <h4>Nguyễn Minh Anh</h4>
                  <span>Khách hàng thân thiết</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "BloomStore đã trang trí đám cưới của tôi thật tuyệt vời. Mọi chi tiết đều
                hoàn hảo và đội ngũ rất chuyên nghiệp. Cảm ơn các bạn rất nhiều!"
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Trần Văn Đức" />
                <div className="author-info">
                  <h4>Trần Văn Đức</h4>
                  <span>Khách hàng doanh nghiệp</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                "Tôi đã đặt hoa online lần đầu và rất hài lòng. Website dễ sử dụng,
                hoa đẹp và giá cả hợp lý. Sẽ giới thiệu cho bạn bè!"
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Lê Thị Hương" />
                <div className="author-info">
                  <h4>Lê Thị Hương</h4>
                  <span>Khách hàng mới</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Sẵn sàng tạo nên khoảnh khắc đặc biệt?</h2>
            <p>Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí</p>
            <div className="cta-actions">
              <a href="tel:+84987654321" className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Gọi ngay: 098 765 4321
              </a>
              <a href="https://zalo.me/bloomstore" className="btn btn-outline">
                <i className="fas fa-comments"></i>
                Chat Zalo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;