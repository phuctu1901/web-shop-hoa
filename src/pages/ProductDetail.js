import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Product data
  const products = {
    1: {
      id: 1,
      name: 'Bó hoa cưới Romantic',
      category: 'wedding',
      price: 1200000,
      originalPrice: 1500000,
      shortDescription: 'Hoa hồng trắng và baby breath tinh tế',
      longDescription: 'Bó hoa cưới Romantic là tác phẩm nghệ thuật được chế tác từ những bông hoa hồng trắng Ecuador cao cấp, kết hợp cùng baby breath tạo nên vẻ đẹp tinh khôi, lãng mạn. Mỗi bông hoa được tuyển chọn kỹ lưỡng, đảm bảo độ tươi mới và chất lượng hoàn hảo cho ngày trọng đại của bạn.',
      images: [
        'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1594736797933-d0282ba6205c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop'
      ],
      rating: 5,
      reviews: 24,
      badge: 'Bán chạy',
      features: [
        '25 hoa hồng trắng Ecuador cao cấp',
        '15 cành baby breath tươi mới',
        'Giấy gói lụa cao cấp màu trắng',
        'Ribbon satin sang trọng',
        'Thiết kế bởi florist chuyên nghiệp',
        'Bảo quản tươi 10-14 ngày'
      ],
      specifications: {
        'Kích thước': '35cm x 45cm',
        'Chiều cao': '50-55cm',
        'Trọng lượng': '1.2kg',
        'Số lượng hoa': '40 bông',
        'Nguồn gốc': 'Ecuador, New Zealand',
        'Thời gian bảo quản': '10-14 ngày',
        'Phù hợp': 'Đám cưới, lễ đính hôn'
      },
      careInstructions: [
        'Cắt thân hoa xiên 2-3cm trong nước chảy',
        'Thay nước mỗi 2 ngày, rửa sạch bình',
        'Thêm 1 thìa đường hoặc dung dịch dưỡng hoa',
        'Đặt nơi mát mẻ, tránh ánh nắng trực tiếp',
        'Bỏ lá héo và hoa tàn để giữ tươi lâu'
      ],
      ingredients: [
        'Hoa hồng trắng Ecuador: 25 bông',
        'Baby breath: 15 cành',
        'Lá eucalyptus: 10 cành',
        'Giấy gói lụa cao cấp',
        'Ribbon satin trắng'
      ],
      occasions: ['Đám cưới', 'Lễ đính hôn', 'Kỷ niệm ngày cưới', 'Chụp ảnh cưới'],
      deliveryInfo: {
        freeShipping: 500000,
        expressDelivery: '2-4 giờ',
        standardDelivery: '1-2 ngày',
        areas: 'TP.HCM, Hà Nội, Đà Nẵng'
      }
    },
    2: {
      id: 2,
      name: 'Bó hoa cưới Vintage',
      category: 'wedding',
      price: 1400000,
      originalPrice: null,
      shortDescription: 'Hoa hồng champagne và eucalyptus',
      longDescription: 'Bộ sưu tập Vintage mang phong cách cổ điển, thanh lịch với tông màu champagne ấm áp. Sự kết hợp hoàn hảo giữa hoa hồng champagne và lá eucalyptus tạo nên vẻ đẹp vintage đầy quyến rũ.',
      images: [
        'https://images.unsplash.com/photo-1594736797933-d0282ba6205c?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop'
      ],
      rating: 4,
      reviews: 18,
      features: [
        '20 hoa hồng champagne Ecuador',
        '12 cành eucalyptus tươi',
        'Giấy kraft vintage',
        'Ribbon jute tự nhiên',
        'Phong cách vintage classic'
      ],
      specifications: {
        'Kích thước': '32cm x 40cm',
        'Chiều cao': '45-50cm',
        'Số lượng hoa': '32 bông',
        'Phong cách': 'Vintage, cổ điển',
        'Màu sắc': 'Champagne, nâu nhạt'
      },
      careInstructions: [
        'Xịt nước nhẹ lên lá eucalyptus',
        'Thay nước 2 ngày/lần',
        'Giữ ở nơi thoáng mát',
        'Tránh tiếp xúc ánh nắng mạnh'
      ],
      occasions: ['Đám cưới vintage', 'Tiệc garden party', 'Chụp ảnh pre-wedding']
    },
    3: {
      id: 3,
      name: 'Bó hoa sinh nhật rực rỡ',
      category: 'birthday',
      price: 800000,
      shortDescription: 'Hoa hướng dương và hoa hồng cam',
      longDescription: 'Bó hoa sinh nhật tràn đầy năng lượng với sự kết hợp rực rỡ giữa hoa hướng dương và hoa hồng cam.',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop'
      ],
      rating: 4,
      reviews: 15,
      features: [
        '6 hoa hướng dương tươi',
        '12 hoa hồng cam Ecuador',
        'Lá xanh trang trí',
        'Giấy gói màu sắc rực rỡ',
        'Ribbon màu cam'
      ],
      occasions: ['Sinh nhật', 'Chúc mừng', 'Động viên']
    },
    4: {
      id: 4,
      name: 'Hộp hoa kỷ niệm',
      category: 'anniversary',
      price: 1800000,
      shortDescription: 'Hoa hồng đỏ trong hộp sang trọng',
      longDescription: 'Hộp hoa kỷ niệm cao cấp với thiết kế sang trọng, chứa đựng những bông hoa hồng đỏ Ecuador chọn lọc.',
      images: [
        'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop'
      ],
      rating: 5,
      reviews: 31,
      badge: 'Mới',
      occasions: ['Kỷ niệm', 'Valentine', 'Cầu hôn']
    },
    5: {
      id: 5,
      name: 'Bó hoa chia buồn',
      category: 'sympathy',
      price: 650000,
      shortDescription: 'Hoa lily trắng và lá dương xỉ',
      longDescription: 'Bó hoa chia buồn được thiết kế trang nghiêm với hoa lily trắng tinh khôi.',
      images: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop'
      ],
      rating: 5,
      reviews: 12,
      occasions: ['Chia buồn', 'Tưởng nhớ']
    },
    6: {
      id: 6,
      name: 'Bó hoa quà tặng',
      category: 'gift',
      price: 750000,
      shortDescription: 'Cẩm tú cầu xanh dương tươi mát',
      longDescription: 'Bó hoa quà tặng với cẩm tú cầu xanh dương tươi mát.',
      images: [
        'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop'
      ],
      rating: 4,
      reviews: 20,
      occasions: ['Quà tặng', 'Trang trí nhà']
    }
  };

  const product = products[id] || products[1];

  const sampleReviews = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      rating: 5,
      date: '20/01/2026',
      comment: 'Hoa đẹp tuyệt vời! Giao hàng đúng hẹn và chất lượng vượt ngoài mong đợi. Cô dâu rất thích!',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: 'Trần Văn Hùng',
      rating: 5,
      date: '18/01/2026',
      comment: 'Dịch vụ tuyệt vời, florist tư vấn nhiệt tình. Bó hoa đẹp như trong ảnh.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      name: 'Lê Thị Hương',
      rating: 4,
      date: '15/01/2026',
      comment: 'Hoa đẹp, thiết kế sang trọng. Giá hơi cao nhưng chất lượng xứng đáng.',
      verified: false,
      helpful: 5
    }
  ];

  const relatedProducts = Object.values(products).filter(p =>
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const categoryLabels = {
    wedding: 'Cưới hỏi',
    birthday: 'Sinh nhật',
    anniversary: 'Kỷ niệm',
    sympathy: 'Chia buồn',
    gift: 'Quà tặng'
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={i < rating ? 'fas fa-star' : 'far fa-star'}></i>
    ));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setActiveTab('description');
  }, [id]);

  const zaloLink = `https://zalo.me/0987654321`;
  const phoneNumber = '0987654321';

  return (
    <div className="pd-page">

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="pd-container">
          <nav className="pd-breadcrumb-nav">
            <Link to="/">Trang chủ</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/products">Sản phẩm</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to={`/products?category=${product.category}`}>
              {categoryLabels[product.category] || 'Khác'}
            </Link>
            <i className="fas fa-chevron-right"></i>
            <span>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ====== HERO PRODUCT SECTION ====== */}
      <section className="pd-hero">
        <div className="pd-container">
          <div className="pd-hero-grid">

            {/* Gallery */}
            <div className="pd-gallery">
              <div className="pd-gallery-main">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  loading="eager"
                  onClick={() => setShowFullGallery(true)}
                />

                {product.badge && (
                  <span className="pd-badge pd-badge--hot">{product.badge}</span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="pd-badge pd-badge--sale">-{calculateDiscount()}%</span>
                )}

                {product.images.length > 1 && (
                  <>
                    <button
                      className="pd-gallery-nav pd-gallery-nav--prev"
                      onClick={() => setActiveImageIndex((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="pd-gallery-nav pd-gallery-nav--next"
                      onClick={() => setActiveImageIndex((prev) =>
                        (prev + 1) % product.images.length
                      )}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </>
                )}

                <button
                  className="pd-gallery-zoom"
                  onClick={() => setShowFullGallery(true)}
                >
                  <i className="fas fa-search-plus"></i>
                </button>
              </div>

              {product.images.length > 1 && (
                <div className="pd-thumbs">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`pd-thumb ${activeImageIndex === index ? 'pd-thumb--active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="pd-info">

              {/* Category + Badge */}
              <div className="pd-info-top">
                <Link to={`/products?category=${product.category}`} className="pd-category">
                  {categoryLabels[product.category] || 'Khác'}
                </Link>
                {product.badge && (
                  <span className="pd-status-badge">
                    <i className="fas fa-fire"></i> {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="pd-title">{product.name}</h1>

              {/* Rating */}
              <div className="pd-rating">
                <div className="pd-stars">
                  {renderStars(product.rating)}
                </div>
                <span className="pd-rating-text">
                  {product.rating}/5
                </span>
                <span className="pd-rating-count">
                  ({product.reviews} đánh giá)
                </span>
              </div>

              {/* Price */}
              <div className="pd-price-block">
                <span className="pd-price">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="pd-price-old">{formatPrice(product.originalPrice)}</span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="pd-price-save">
                    Tiết kiệm {formatPrice(product.originalPrice - product.price)} (-{calculateDiscount()}%)
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="pd-short-desc">{product.shortDescription}</p>

              {/* Key Features */}
              {product.features && (
                <div className="pd-features">
                  <h3 className="pd-features-title">Đặc điểm nổi bật</h3>
                  <ul className="pd-features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Occasions */}
              {product.occasions && (
                <div className="pd-occasions">
                  <h3 className="pd-occasions-title">Phù hợp cho dịp</h3>
                  <div className="pd-occasion-tags">
                    {product.occasions.map((occasion, index) => (
                      <span key={index} className="pd-occasion-tag">{occasion}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="pd-divider"></div>

              {/* ====== CTA CONTACT SECTION ====== */}
              <div className="pd-cta-section">
                <h3 className="pd-cta-title">
                  <i className="fas fa-headset"></i>
                  Liên hệ tư vấn & đặt hàng
                </h3>
                <p className="pd-cta-subtitle">
                  Gọi điện hoặc nhắn tin Zalo để được tư vấn và đặt hoa nhanh nhất
                </p>

                <div className="pd-cta-buttons">
                  <a
                    href={zaloLink}
                    className="pd-cta-btn pd-cta-btn--zalo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="pd-cta-btn-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <div className="pd-cta-btn-text">
                      <strong>Chat Zalo</strong>
                      <small>Tư vấn miễn phí</small>
                    </div>
                  </a>

                  <a
                    href={`tel:${phoneNumber}`}
                    className="pd-cta-btn pd-cta-btn--phone"
                  >
                    <div className="pd-cta-btn-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="pd-cta-btn-text">
                      <strong>Gọi ngay</strong>
                      <small>0987.654.321</small>
                    </div>
                  </a>
                </div>

                <div className="pd-cta-extra">
                  <button
                    className="pd-btn-outline"
                    onClick={() => navigator.share && navigator.share({
                      title: product.name,
                      text: `${product.shortDescription} - ${formatPrice(product.price)}`,
                      url: window.location.href
                    })}
                  >
                    <i className="fas fa-share-alt"></i> Chia sẻ
                  </button>
                  <button className="pd-btn-outline">
                    <i className="far fa-heart"></i> Yêu thích
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pd-trust">
                <div className="pd-trust-item">
                  <div className="pd-trust-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div>
                    <strong>Giao hàng nhanh</strong>
                    <span>2-4 giờ nội thành</span>
                  </div>
                </div>
                <div className="pd-trust-item">
                  <div className="pd-trust-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <strong>Đảm bảo chất lượng</strong>
                    <span>100% hoa tươi</span>
                  </div>
                </div>
                <div className="pd-trust-item">
                  <div className="pd-trust-icon">
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <div>
                    <strong>Đổi trả 24h</strong>
                    <span>Nếu có vấn đề</span>
                  </div>
                </div>
                <div className="pd-trust-item">
                  <div className="pd-trust-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <strong>Hỗ trợ 24/7</strong>
                    <span>Tư vấn miễn phí</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ====== DETAIL TABS ====== */}
      <section className="pd-details">
        <div className="pd-container">
          <div className="pd-tabs">

            <div className="pd-tabs-nav">
              <button
                className={`pd-tab ${activeTab === 'description' ? 'pd-tab--active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                <i className="fas fa-align-left"></i>
                <span>Mô tả</span>
              </button>

              {product.specifications && (
                <button
                  className={`pd-tab ${activeTab === 'specifications' ? 'pd-tab--active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  <i className="fas fa-list-alt"></i>
                  <span>Thông số</span>
                </button>
              )}

              {product.careInstructions && (
                <button
                  className={`pd-tab ${activeTab === 'care' ? 'pd-tab--active' : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  <i className="fas fa-leaf"></i>
                  <span>Chăm sóc</span>
                </button>
              )}

              <button
                className={`pd-tab ${activeTab === 'reviews' ? 'pd-tab--active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <i className="fas fa-star"></i>
                <span>Đánh giá ({sampleReviews.length})</span>
              </button>

              {product.deliveryInfo && (
                <button
                  className={`pd-tab ${activeTab === 'delivery' ? 'pd-tab--active' : ''}`}
                  onClick={() => setActiveTab('delivery')}
                >
                  <i className="fas fa-truck"></i>
                  <span>Giao hàng</span>
                </button>
              )}
            </div>

            <div className="pd-tabs-content">

              {/* Description */}
              {activeTab === 'description' && (
                <div className="pd-panel">
                  <h3>Mô tả sản phẩm</h3>
                  <p className="pd-panel-desc">{product.longDescription}</p>

                  {product.features && (
                    <div className="pd-panel-features">
                      <h4>Đặc điểm nổi bật</h4>
                      <div className="pd-panel-features-grid">
                        {product.features.map((feature, index) => (
                          <div key={index} className="pd-panel-feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.occasions && (
                    <div className="pd-panel-occasions">
                      <h4>Phù hợp cho dịp</h4>
                      <div className="pd-panel-occasion-tags">
                        {product.occasions.map((occasion, index) => (
                          <span key={index} className="pd-panel-occasion-tag">{occasion}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Specifications */}
              {activeTab === 'specifications' && product.specifications && (
                <div className="pd-panel">
                  <h3>Thông số kỹ thuật</h3>
                  <div className="pd-specs-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="pd-spec-row">
                        <span className="pd-spec-label">{key}</span>
                        <span className="pd-spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Care Instructions */}
              {activeTab === 'care' && product.careInstructions && (
                <div className="pd-panel">
                  <h3>Hướng dẫn chăm sóc hoa</h3>
                  <p className="pd-panel-desc">Để hoa giữ được vẻ tươi đẹp lâu nhất, vui lòng làm theo hướng dẫn sau:</p>

                  <div className="pd-care-steps">
                    {product.careInstructions.map((instruction, index) => (
                      <div key={index} className="pd-care-step">
                        <div className="pd-care-step-num">{index + 1}</div>
                        <p>{instruction}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pd-care-tips">
                    <div className="pd-care-tip">
                      <i className="fas fa-lightbulb"></i>
                      <div>
                        <strong>Mẹo hay:</strong>
                        <p>Thêm 1 viên aspirin hoặc 1 thìa đường vào nước để hoa tươi lâu hơn.</p>
                      </div>
                    </div>
                    <div className="pd-care-tip">
                      <i className="fas fa-thermometer-half"></i>
                      <div>
                        <strong>Nhiệt độ lý tưởng:</strong>
                        <p>Giữ hoa ở 18-22°C để đạt hiệu quả tốt nhất.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div className="pd-panel">
                  <div className="pd-reviews-summary">
                    <div className="pd-reviews-score">
                      <span className="pd-reviews-number">{product.rating}</span>
                      <div className="pd-reviews-stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="pd-reviews-count">{product.reviews} đánh giá</span>
                    </div>

                    <div className="pd-reviews-bars">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="pd-review-bar">
                          <span>{star} <i className="fas fa-star"></i></span>
                          <div className="pd-review-bar-track">
                            <div
                              className="pd-review-bar-fill"
                              style={{ width: star <= product.rating ? '85%' : '8%' }}
                            ></div>
                          </div>
                          <span className="pd-review-bar-count">
                            {star <= product.rating ? Math.floor(product.reviews * 0.8) : Math.floor(product.reviews * 0.05)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pd-reviews-list">
                    {sampleReviews.map(review => (
                      <div key={review.id} className="pd-review-card">
                        <div className="pd-review-header">
                          <div className="pd-review-avatar">
                            {review.name.charAt(0)}
                          </div>
                          <div className="pd-review-meta">
                            <h4>{review.name}</h4>
                            <div className="pd-review-info">
                              <div className="pd-review-stars">{renderStars(review.rating)}</div>
                              <span>{review.date}</span>
                              {review.verified && (
                                <span className="pd-verified">
                                  <i className="fas fa-check-circle"></i> Đã mua
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="pd-review-text">{review.comment}</p>
                        <button className="pd-review-helpful">
                          <i className="far fa-thumbs-up"></i> Hữu ích ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery */}
              {activeTab === 'delivery' && product.deliveryInfo && (
                <div className="pd-panel">
                  <h3>Thông tin giao hàng</h3>

                  <div className="pd-delivery-options">
                    <div className="pd-delivery-option">
                      <div className="pd-delivery-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div>
                        <h4>Express</h4>
                        <p>Nhận hàng trong {product.deliveryInfo.expressDelivery}</p>
                        <span className="pd-delivery-price">50.000đ</span>
                      </div>
                    </div>
                    <div className="pd-delivery-option">
                      <div className="pd-delivery-icon">
                        <i className="fas fa-truck"></i>
                      </div>
                      <div>
                        <h4>Tiêu chuẩn</h4>
                        <p>Nhận hàng trong {product.deliveryInfo.standardDelivery}</p>
                        <span className="pd-delivery-price pd-delivery-price--free">
                          {product.price >= product.deliveryInfo.freeShipping ? 'Miễn phí' : '30.000đ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pd-delivery-areas">
                    <h4>Khu vực giao hàng</h4>
                    <p>Hiện tại giao hàng tại: <strong>{product.deliveryInfo.areas}</strong></p>
                    <p><strong>Miễn phí giao hàng</strong> cho đơn từ {formatPrice(product.deliveryInfo.freeShipping)} trở lên.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== RELATED PRODUCTS ====== */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="pd-container">
            <div className="pd-section-header">
              <h2>Sản phẩm tương tự</h2>
              <p>Có thể bạn quan tâm trong danh mục <strong>{categoryLabels[product.category]}</strong></p>
            </div>

            <div className="pd-related-grid">
              {relatedProducts.map(rp => (
                <Link key={rp.id} to={`/products/${rp.id}`} className="pd-related-card">
                  <div className="pd-related-img">
                    <img src={rp.images[0]} alt={rp.name} loading="lazy" />
                    <div className="pd-related-overlay">
                      <span>Xem chi tiết <i className="fas fa-arrow-right"></i></span>
                    </div>
                  </div>
                  <div className="pd-related-body">
                    <h3>{rp.name}</h3>
                    <div className="pd-related-stars">
                      {renderStars(rp.rating)}
                      <span>({rp.reviews})</span>
                    </div>
                    <div className="pd-related-price">
                      <span className="pd-price">{formatPrice(rp.price)}</span>
                      {rp.originalPrice && (
                        <span className="pd-price-old">{formatPrice(rp.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pd-related-actions">
              <Link to="/products" className="pd-btn-primary">
                <i className="fas fa-th-large"></i> Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====== FLOATING CONTACT BAR (Mobile) ====== */}
      <div className="pd-floating-bar">
        <a href={zaloLink} className="pd-float-btn pd-float-btn--zalo" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-comments"></i>
          <span>Chat Zalo</span>
        </a>
        <a href={`tel:${phoneNumber}`} className="pd-float-btn pd-float-btn--phone">
          <i className="fas fa-phone-alt"></i>
          <span>Gọi ngay</span>
        </a>
      </div>

      {/* ====== FULLSCREEN GALLERY MODAL ====== */}
      {showFullGallery && (
        <div className="pd-modal" onClick={() => setShowFullGallery(false)}>
          <div className="pd-modal-content" onClick={e => e.stopPropagation()}>
            <button className="pd-modal-close" onClick={() => setShowFullGallery(false)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="pd-modal-img">
              <img src={product.images[activeImageIndex]} alt={product.name} />
            </div>

            {product.images.length > 1 && (
              <div className="pd-modal-thumbs">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`pd-modal-thumb ${activeImageIndex === index ? 'pd-modal-thumb--active' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;