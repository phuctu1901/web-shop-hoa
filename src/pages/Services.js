import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/services.css';

const Services = () => {
  const { settings } = useSettings();
  usePageTitle('Dịch vụ');
  const phone = settings.phone || '';
  const services = [
    {
      id: 1,
      icon: 'fas fa-truck',
      title: 'Giao hàng nhanh chóng',
      priceLabel: 'Miễn phí:',
      price: '0đ - 50kđ',
      description: 'Giao hoa tận nơi trong vòng 2 giờ, đảm bảo độ tươi mới tuyệt đối. Đội ngũ giao hàng chuyên nghiệp, cẩn thận.',
      features: [
        'Giao hàng 24/7',
        'Miễn phí nội thành (>500k)',
        'Đảm bảo đúng giờ',
        'Theo dõi đơn hàng realtime'
      ],
      featured: true
    },
    {
      id: 2,
      icon: 'fas fa-paint-brush',
      title: 'Thiết kế theo yêu cầu',
      priceLabel: 'Từ:',
      price: '300kđ',
      description: 'Tư vấn và thiết kế hoa theo ý tưởng riêng của khách hàng. Đội ngũ florist chuyên nghiệp với nhiều năm kinh nghiệm.',
      features: [
        'Tư vấn miễn phí',
        'Thiết kế độc quyền',
        'Sửa đổi không giới hạn',
        'Preview 3D'
      ]
    },
    {
      id: 3,
      icon: 'fas fa-calendar-alt',
      title: 'Đặt hoa định kỳ',
      priceLabel: 'Từ:',
      price: '500kđ/tháng',
      description: 'Dịch vụ đặt hoa tự động theo lịch cho doanh nghiệp và cá nhân. Tiết kiệm thời gian, đảm bảo không bao giờ quên.',
      features: [
        'Lịch linh hoạt',
        'Giảm giá 10-20% cho VIP',
        'Thông báo trước 24h',
        'Quản lý qua app'
      ]
    },
    {
      id: 4,
      icon: 'fas fa-users',
      title: 'Trang trí sự kiện',
      priceLabel: 'Từ:',
      price: '5 triệuđ',
      description: 'Trang trí hoa cho đám cưới, hội nghị và các sự kiện đặc biệt. Đội ngũ chuyên nghiệp, kinh nghiệm tổ chức hàng trăm sự kiện.',
      features: [
        'Khảo sát địa điểm',
        'Thiết kế 3D',
        'Setup trong ngày',
        'Bảo hành 24h'
      ]
    },
    {
      id: 5,
      icon: 'fas fa-seedling',
      title: 'Tư vấn chăm sóc hoa',
      priceLabel: 'Miễn phí',
      price: '0đ',
      description: 'Hướng dẫn chăm sóc và bảo quản hoa để giữ được vẻ đẹp lâu nhất. Chia sẻ bí quyết từ các chuyên gia nhiều năm kinh nghiệm.',
      features: [
        'Video hướng dẫn',
        'Hỗ trợ 24/7',
        'Tips chuyên nghiệp',
        'Group Facebook VIP'
      ]
    },
    {
      id: 6,
      icon: 'fas fa-globe',
      title: 'Hoa tươi nhập khẩu',
      priceLabel: 'Theo yêu cầu',
      price: 'Báo giá',
      description: 'Cung cấp các loài hoa nhập khẩu cao cấp từ Hà Lan, Ecuador và Colombia. Chất lượng đảm bảo, giá cả cạnh tranh.',
      features: [
        'Nguồn gốc rõ ràng',
        'Chứng nhận chất lượng',
        'Đặt hàng theo mùa',
        'Giao hàng lạnh'
      ]
    }
  ];

  return (
    <>
      {/* Page Header */}
      <section className="page-header services-hero">
        <div className="hero-background">
          <div className="floating-services">
            <div className="floating-icon" data-speed="0.5"><i className="fas fa-truck"></i></div>
            <div className="floating-icon" data-speed="0.8"><i className="fas fa-paint-brush"></i></div>
            <div className="floating-icon" data-speed="0.3"><i className="fas fa-users"></i></div>
            <div className="floating-icon" data-speed="0.6"><i className="fas fa-seedling"></i></div>
            <div className="floating-icon" data-speed="0.4"><i className="fas fa-globe"></i></div>
            <div className="floating-icon" data-speed="0.7"><i className="fas fa-calendar-alt"></i></div>
          </div>
        </div>
        <div className="container">
          <div className="page-header-content">
            <div className="services-badge">
              <i className="fas fa-star"></i>
              <span>Dịch vụ được khách hàng đánh giá 5 sao</span>
            </div>
            <h1 className="page-title animate-slide-up">Dịch vụ của chúng tôi</h1>
            <p className="page-subtitle animate-slide-up">Trải nghiệm dịch vụ chuyên nghiệp và tận tâm cho mọi dịp đặc biệt</p>
            <div className="services-stats">
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Dịch vụ chính</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Hỗ trợ</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.8%</div>
                <div className="stat-label">Hài lòng</div>
              </div>
            </div>
            <nav className="breadcrumb">
              <Link to="/">Trang chủ</Link>
              <i className="fas fa-chevron-right"></i>
              <span>Dịch vụ</span>
            </nav>
          </div>
        </div>
        <div className="scroll-down-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Các dịch vụ chính</span>
            <h2 className="section-title">Lựa chọn dịch vụ phù hợp nhất</h2>
            <p className="section-description">
              Chúng tôi cung cấp đa dạng dịch vụ để đáp ứng mọi nhu cầu của khách hàng
            </p>
          </div>

          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className={`service-card ${service.featured ? 'featured' : ''}`}>
                {service.featured && <div className="service-badge">Phổ biến nhất</div>}
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <div className="service-price">
                  <span className="price-label">{service.priceLabel}</span>
                  <span className="price">{service.price}</span>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-features">
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-cta">
                  <Link to="/contact" className="btn btn-primary">Liên hệ ngay</Link>
                  <button className="btn btn-outline" onClick={(e) => e.preventDefault()}>Xem chi tiết</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Tại sao chọn chúng tôi</span>
            <h2 className="section-title">Những lý do nên chọn {settings.shop_name || ''}</h2>
          </div>

          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Chất lượng đảm bảo</h3>
              <p>100% hoa tươi nhập khẩu từ các nhà vườn uy tín, được kiểm tra chất lượng kỹ lưỡng trước khi giao</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Đội ngũ chuyên nghiệp</h3>
              <p>Florist có hơn 10 năm kinh nghiệm, được đào tạo bài bản về nghệ thuật cắm hoa hiện đại</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Giao hàng đúng hẹn</h3>
              <p>Cam kết giao hàng đúng giờ đã hẹn, hoàn tiền 100% nếu giao trễ do lỗi của chúng tôi</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <h3>Giá cả hợp lý</h3>
              <p>Mức giá cạnh tranh với chất lượng vượt trội, nhiều chương trình khuyến mãi hấp dẫn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Quy trình làm việc</span>
            <h2 className="section-title">4 bước đơn giản để có hoa đẹp</h2>
          </div>

          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Tư vấn & Lựa chọn</h3>
                <p>Trao đổi về nhu cầu, ngân sách và nhận tư vấn từ chuyên gia về loại hoa, màu sắc phù hợp</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Thiết kế & Xác nhận</h3>
                <p>Florist tạo bản thiết kế 3D cho bạn xem trước và xác nhận trước khi thực hiện</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Sản xuất & Đóng gói</h3>
                <p>Đội ngũ florist tỉ mỉ thực hiện và đóng gói cẩn thận với vật liệu cao cấp</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Giao hàng & Hỗ trợ</h3>
                <p>Giao hàng tận nơi đúng hẹn và hướng dẫn cách chăm sóc để hoa tươi lâu</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Bạn cần tư vấn thêm về dịch vụ?</h2>
            <p>Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
            <div className="cta-actions">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Gọi ngay: {phone}
              </a>
              <a href={settings.zalo_url || '#'} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
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

export default Services;
