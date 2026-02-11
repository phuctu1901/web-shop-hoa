import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import api from '../api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { settings } = useSettings();

  useEffect(() => {
    // Fetch featured products from API
    api.getProducts()
      .then(data => {
        const items = Array.isArray(data) ? data : (data.data || data.items || []);
        // Take first 3 as featured
        setFeaturedProducts(items.slice(0, 3));
      })
      .catch(err => {
        console.error('Failed to load featured products:', err);
      });
  }, []);

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

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return api.imageUrl(product.images[0].url);
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  const getProductAlt = (product) => {
    if (product.images && product.images.length > 0 && product.images[0].altText) {
      return product.images[0].altText;
    }
    return product.name;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const zaloLink = settings.zalo_url || '#';
  const phoneNumber = settings.phone || '';

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

      {/* Featured Products Preview — from API */}
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
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={getProductImage(product)} alt={getProductAlt(product)} loading="lazy" />
                  <div className="product-overlay">
                    <Link to={product.slug ? `/san-pham/${product.slug}` : `/products/${product.id}`} className="btn-quick-view">Xem chi tiết</Link>
                    <a href={zaloLink} className="btn-contact" target="_blank" rel="noopener noreferrer">Liên hệ đặt hàng</a>
                  </div>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="price-current">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="price-original">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
              <span className="section-subtitle">Về {settings.shop_name || ''}</span>
              <h2 className="section-title">Hành trình tạo nên những khoảnh khắc đẹp</h2>
              <p className="about-description">
                Với hơn 10 năm kinh nghiệm trong ngành hoa tươi, {settings.shop_name || ''} tự hào mang đến
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
              <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop" alt={`Về ${settings.shop_name || ''}`} />
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
                Chắc chắn sẽ quay lại {settings.shop_name || ''} cho những dịp đặc biệt khác."
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
                "{settings.shop_name || ''} đã trang trí đám cưới của tôi thật tuyệt vời. Mọi chi tiết đều
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
              <a href={`tel:${phoneNumber}`} className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Gọi ngay: {phoneNumber}
              </a>
              <a href={zaloLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
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