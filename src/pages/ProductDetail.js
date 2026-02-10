import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Mở rộng dữ liệu sản phẩm chi tiết hơn
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
      longDescription: 'Bó hoa sinh nhật tràn đầy năng lượng với sự kết hợp rực rỡ giữa hoa hướng dương và hoa hồng cam. Đây là món quà hoàn hảo để thể hiện niềm vui và lời chúc tốt đẹp nhất trong ngày sinh nhật.',
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
      longDescription: 'Hộp hoa kỷ niệm cao cấp với thiết kế sang trọng, chứa đựng những bông hoa hồng đỏ Ecuador chọn lọc. Món quà hoàn hảo để ghi dấu những kỷ niệm đáng nhớ.',
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
      longDescription: 'Bó hoa chia buồn được thiết kế trang nghiêm với hoa lily trắng tinh khôi, thể hiện lòng thương tiếc và sự tôn kính.',
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
      longDescription: 'Bó hoa quà tặng với cẩm tú cầu xanh dương tươi mát, mang đến cảm giác bình yên và thanh thản.',
      images: [
        'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop'
      ],
      rating: 4,
      reviews: 20,
      occasions: ['Quà tặng', 'Trang trí nhà']
    }
  };

  const product = products[id] || products[1];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      rating: 5,
      date: '20/01/2026',
      comment: 'Hoa đẹp tuyệt vời! Giao hàng đúng hẹn và chất lượng vượt ngoài mong đợi. Cô dâu rất thích và bó hoa giữ được độ tươi suốt cả ngày.',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      name: 'Trần Văn Hùng',
      rating: 5,
      date: '18/01/2026',
      comment: 'Dịch vụ tuyệt vời, florist tư vấn nhiệt tình. Bó hoa được đóng gói rất cẩn thận và đẹp như trong ảnh.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      name: 'Lê Thị Hương',
      rating: 4,
      date: '15/01/2026',
      comment: 'Hoa đẹp, thiết kế sang trọng. Chỉ có điều giá hơi cao một chút nhưng chất lượng xứng đáng.',
      verified: false,
      helpful: 5
    }
  ];

  const relatedProducts = Object.values(products).filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 3);

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
  }, [id]);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-item">Trang chủ</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/products" className="breadcrumb-item">Sản phẩm</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to={`/products?category=${product.category}`} className="breadcrumb-item">
              {product.category === 'wedding' ? 'Cưới hỏi' :
               product.category === 'birthday' ? 'Sinh nhật' :
               product.category === 'anniversary' ? 'Kỷ niệm' :
               product.category === 'sympathy' ? 'Chia buồn' : 'Quà tặng'}
            </Link>
            <i className="fas fa-chevron-right"></i>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="product-main">
        <div className="container">
          <div className="product-layout">
            
            {/* Product Gallery - Expanded */}
            <div className="product-gallery-section">
              <div className="product-gallery">
                
                {/* Main Image - Larger */}
                <div className="main-image-container">
                  <div className="main-image">
                    <img 
                      src={product.images[activeImageIndex]} 
                      alt={product.name}
                      loading="eager"
                    />
                    
                    {/* Image Badges */}
                    <div className="image-badges">
                      {product.badge && (
                        <span className="product-badge">{product.badge}</span>
                      )}
                      {calculateDiscount() > 0 && (
                        <span className="discount-badge">-{calculateDiscount()}%</span>
                      )}
                    </div>

                    {/* Image Navigation */}
                    {product.images.length > 1 && (
                      <div className="image-nav">
                        <button 
                          className="nav-btn prev"
                          onClick={() => setActiveImageIndex((prev) => 
                            prev === 0 ? product.images.length - 1 : prev - 1
                          )}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button 
                          className="nav-btn next"
                          onClick={() => setActiveImageIndex((prev) => 
                            (prev + 1) % product.images.length
                          )}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    )}

                    {/* Zoom/Fullscreen button */}
                    <button 
                      className="zoom-btn"
                      onClick={() => setShowFullGallery(true)}
                      title="Xem ảnh lớn"
                    >
                      <i className="fas fa-search-plus"></i>
                    </button>
                  </div>

                  {/* Image Counter */}
                  <div className="image-counter">
                    <span className="current">{activeImageIndex + 1}</span>
                    <span className="divider">/</span>
                    <span className="total">{product.images.length}</span>
                  </div>
                </div>

                {/* Thumbnail Images - Horizontal */}
                {product.images.length > 1 && (
                  <div className="thumbnail-gallery">
                    <div className="thumbnail-scroll">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <img src={image} alt={`${product.name} ${index + 1}`} />
                          <div className="thumbnail-overlay"></div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <div className="product-info-sticky">
                
                {/* Product Title & Category */}
                <div className="product-header">
                  <div className="product-category-badge">
                    <Link to={`/products?category=${product.category}`}>
                      {product.category === 'wedding' ? 'Cưới hỏi' :
                       product.category === 'birthday' ? 'Sinh nhật' :
                       product.category === 'anniversary' ? 'Kỷ niệm' :
                       product.category === 'sympathy' ? 'Chia buồn' : 'Quà tặng'}
                    </Link>
                  </div>
                  
                  {product.badge && (
                    <div className="product-status-badge">
                      <i className="fas fa-star"></i>
                      <span>{product.badge}</span>
                    </div>
                  )}
                  
                  <h1 className="product-title">{product.name}</h1>
                </div>
                
                {/* Rating & Reviews */}
                <div className="product-rating-section">
                  <div className="rating-display">
                    <div className="rating-stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">
                      {product.rating}/5 ({product.reviews} đánh giá)
                    </span>
                  </div>
                  <button 
                    className="view-reviews-btn"
                    onClick={() => setActiveTab('reviews')}
                  >
                    Xem đánh giá
                  </button>
                </div>

                {/* Price Section */}
                <div className="product-pricing">
                  <div className="price-main">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <div className="savings-info">
                      <span className="savings-amount">
                        Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                      </span>
                      <span className="savings-percent">
                        (-{calculateDiscount()}%)
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Product Summary */}
                <div className="product-summary">
                  <h3>Mô tả ngắn</h3>
                  <p>{product.shortDescription}</p>
                  
                  {product.features && (
                    <div className="key-features">
                      <h4>Đặc điểm nổi bật</h4>
                      <ul>
                        {product.features.slice(0, 4).map((feature, index) => (
                          <li key={index}>
                            <i className="fas fa-check-circle"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {product.features.length > 4 && (
                        <button 
                          className="see-more-btn"
                          onClick={() => setActiveTab('description')}
                        >
                          Xem thêm ({product.features.length - 4} mục khác) <i className="fas fa-arrow-down"></i>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="quick-actions">
                  <div className="action-buttons">
                    <a 
                      href={`https://zalo.me/bloomstore?text=Tôi muốn tư vấn và đặt hoa ${product.name} - Giá: ${formatPrice(product.price)}`}
                      className="btn btn-primary btn-order"
                    >
                      <i className="fas fa-comments"></i>
                      <span>
                        <strong>Tư vấn & Đặt hàng</strong>
                        <small>Qua Zalo</small>
                      </span>
                    </a>
                    
                    <a 
                      href="tel:+84987654321"
                      className="btn btn-secondary btn-call"
                    >
                      <i className="fas fa-phone"></i>
                      <span>
                        <strong>Gọi ngay</strong>
                        <small>0987.654.321</small>
                      </span>
                    </a>
                  </div>
                  
                  <div className="secondary-actions">
                    <button 
                      className="btn btn-outline btn-share"
                      onClick={() => navigator.share && navigator.share({
                        title: product.name,
                        text: `${product.shortDescription} - ${formatPrice(product.price)}`,
                        url: window.location.href
                      })}
                    >
                      <i className="fas fa-share-alt"></i>
                      <span>Chia sẻ</span>
                    </button>
                    
                    <button 
                      className="btn btn-outline btn-wishlist"
                      onClick={() => {}}
                    >
                      <i className="far fa-heart"></i>
                      <span>Yêu thích</span>
                    </button>
                  </div>
                </div>

                {/* Trust Badges & Policies */}
                <div className="trust-policies">
                  <h4>Chính sách & Dịch vụ</h4>
                  <div className="policies-grid">
                    <div className="policy-item">
                      <div className="policy-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div className="policy-content">
                        <strong>Giao hàng nhanh</strong>
                        <span>2-4 giờ trong nội thành</span>
                      </div>
                    </div>
                    
                    <div className="policy-item">
                      <div className="policy-icon">
                        <i className="fas fa-shield-check"></i>
                      </div>
                      <div className="policy-content">
                        <strong>Đảm bảo chất lượng</strong>
                        <span>100% hoa tươi, hoàn tiền nếu không hài lòng</span>
                      </div>
                    </div>
                    
                    <div className="policy-item">
                      <div className="policy-icon">
                        <i className="fas fa-sync-alt"></i>
                      </div>
                      <div className="policy-content">
                        <strong>Đổi trả linh hoạt</strong>
                        <span>Trong vòng 24h nếu có vấn đề</span>
                      </div>
                    </div>
                    
                    <div className="policy-item">
                      <div className="policy-icon">
                        <i className="fas fa-headset"></i>
                      </div>
                      <div className="policy-content">
                        <strong>Hỗ trợ tận tình</strong>
                        <span>Tư vấn miễn phí 24/7</span>
                      </div>
                    </div>
                    
                    {product.deliveryInfo && (
                      <div className="policy-item special">
                        <div className="policy-icon">
                          <i className="fas fa-gift"></i>
                        </div>
                        <div className="policy-content">
                          <strong>Miễn phí giao hàng</strong>
                          <span>Đơn hàng từ {formatPrice(product.deliveryInfo.freeShipping)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="product-details-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Thông tin chi tiết</h2>
            <p className="section-subtitle">Tìm hiểu thêm về sản phẩm</p>
          </div>
          
          <div className="tabs-container">
            
            {/* Tab Navigation - Improved */}
            <div className="tabs-nav">
              <button 
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                <div className="tab-content">
                  <i className="fas fa-align-left"></i>
                  <span className="tab-label">Mô tả</span>
                  <span className="tab-subtitle">Chi tiết sản phẩm</span>
                </div>
              </button>
              
              {product.specifications && (
                <button 
                  className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  <div className="tab-content">
                    <i className="fas fa-list-alt"></i>
                    <span className="tab-label">Thông số</span>
                    <span className="tab-subtitle">Kích thước & quy cách</span>
                  </div>
                </button>
              )}
              
              {product.careInstructions && (
                <button 
                  className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  <div className="tab-content">
                    <i className="fas fa-leaf"></i>
                    <span className="tab-label">Chăm sóc</span>
                    <span className="tab-subtitle">Bảo quản hoa tươi</span>
                  </div>
                </button>
              )}
              
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <div className="tab-content">
                  <i className="fas fa-star"></i>
                  <span className="tab-label">Đánh giá</span>
                  <span className="tab-subtitle">{reviews.length} nhận xét</span>
                </div>
              </button>
              
              {product.deliveryInfo && (
                <button 
                  className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('delivery')}
                >
                  <div className="tab-content">
                    <i className="fas fa-shipping-fast"></i>
                    <span className="tab-label">Giao hàng</span>
                    <span className="tab-subtitle">Chính sách & phí</span>
                  </div>
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="tabs-content">
              
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="tab-panel description-panel">
                  <div className="description-content">
                    <h3>Mô tả sản phẩm</h3>
                    <p className="product-description">{product.longDescription}</p>
                    
                    {product.features && (
                      <div className="features-section">
                        <h4>Đặc điểm nổi bật</h4>
                        <div className="features-grid">
                          {product.features.map((feature, index) => (
                            <div key={index} className="feature-item">
                              <i className="fas fa-check-circle"></i>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.occasions && (
                      <div className="occasions-section">
                        <h4>Phù hợp cho dịp</h4>
                        <div className="occasions-tags">
                          {product.occasions.map((occasion, index) => (
                            <span key={index} className="occasion-tag">
                              {occasion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && product.specifications && (
                <div className="tab-panel specifications-panel">
                  <h3>Thông số kỹ thuật</h3>
                  <div className="specs-table">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-label">{key}</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Care Instructions Tab */}
              {activeTab === 'care' && product.careInstructions && (
                <div className="tab-panel care-panel">
                  <h3>Hướng dẫn chăm sóc hoa</h3>
                  <p className="care-intro">
                    Để hoa giữ được vẻ tươi đẹp lâu nhất, vui lòng làm theo hướng dẫn sau:
                  </p>
                  
                  <div className="care-steps">
                    {product.careInstructions.map((instruction, index) => (
                      <div key={index} className="care-step">
                        <div className="step-number">{index + 1}</div>
                        <div className="step-content">{instruction}</div>
                      </div>
                    ))}
                  </div>

                  <div className="care-tips">
                    <div className="tip-item">
                      <i className="fas fa-lightbulb"></i>
                      <div>
                        <strong>Mẹo hay:</strong>
                        <p>Thêm 1 viên aspirin hoặc 1 thìa đường vào nước để hoa tươi lâu hơn.</p>
                      </div>
                    </div>
                    
                    <div className="tip-item">
                      <i className="fas fa-thermometer-half"></i>
                      <div>
                        <strong>Nhiệt độ:</strong>
                        <p>Giữ hoa ở nhiệt độ 18-22°C để đạt hiệu quả tốt nhất.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="tab-panel reviews-panel">
                  <div className="reviews-header">
                    <h3>Đánh giá từ khách hàng</h3>
                    
                    {/* Overall Rating */}
                    <div className="overall-rating">
                      <div className="rating-summary">
                        <div className="rating-score">{product.rating}</div>
                        <div className="rating-details">
                          <div className="rating-stars">
                            {renderStars(product.rating)}
                          </div>
                          <p>{product.reviews} đánh giá</p>
                        </div>
                      </div>
                      
                      <div className="rating-breakdown">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="rating-bar">
                            <span className="star-label">{star} sao</span>
                            <div className="bar-container">
                              <div 
                                className="bar-fill" 
                                style={{width: star <= product.rating ? '85%' : '10%'}}
                              ></div>
                            </div>
                            <span className="bar-count">
                              {star <= product.rating ? Math.floor(product.reviews * 0.8) : Math.floor(product.reviews * 0.1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="reviews-list">
                    {reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <div className="reviewer-avatar">
                              {review.name.charAt(0)}
                            </div>
                            <div className="reviewer-details">
                              <h4 className="reviewer-name">{review.name}</h4>
                              <div className="review-meta">
                                <div className="review-rating">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="review-date">{review.date}</span>
                                {review.verified && (
                                  <span className="verified-badge">
                                    <i className="fas fa-check-circle"></i>
                                    Đã mua hàng
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="review-content">
                          <p>{review.comment}</p>
                        </div>
                        
                        <div className="review-footer">
                          <button className="helpful-btn">
                            <i className="far fa-thumbs-up"></i>
                            Hữu ích ({review.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write Review CTA */}
                  <div className="write-review-cta">
                    <h4>Bạn đã sử dụng sản phẩm này?</h4>
                    <p>Chia sẻ trải nghiệm của bạn để giúp khách hàng khác!</p>
                    <button className="btn btn-outline">
                      <i className="fas fa-edit"></i>
                      Viết đánh giá
                    </button>
                  </div>
                </div>
              )}

              {/* Delivery Tab */}
              {activeTab === 'delivery' && product.deliveryInfo && (
                <div className="tab-panel delivery-panel">
                  <h3>Thông tin giao hàng</h3>
                  
                  <div className="delivery-options">
                    <div className="delivery-option">
                      <div className="option-icon">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div className="option-info">
                        <h4>Giao hàng Express</h4>
                        <p>Nhận hàng trong vòng {product.deliveryInfo.expressDelivery}</p>
                        <span className="price">Phí: 50,000đ</span>
                      </div>
                    </div>
                    
                    <div className="delivery-option">
                      <div className="option-icon">
                        <i className="fas fa-truck"></i>
                      </div>
                      <div className="option-info">
                        <h4>Giao hàng tiêu chuẩn</h4>
                        <p>Nhận hàng trong vòng {product.deliveryInfo.standardDelivery}</p>
                        <span className="price">
                          {product.price >= product.deliveryInfo.freeShipping ? 'Miễn phí' : 'Phí: 30,000đ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="delivery-areas">
                    <h4>Khu vực giao hàng</h4>
                    <p>Hiện tại chúng tôi giao hàng tại: {product.deliveryInfo.areas}</p>
                    <p>
                      <strong>Miễn phí giao hàng</strong> cho đơn hàng từ {formatPrice(product.deliveryInfo.freeShipping)} trở lên.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products - Improved */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="container">
            <div className="section-header text-center">
              <h2 className="section-title">Sản phẩm tương tự</h2>
              <p className="section-subtitle">
                Những sản phẩm khác bạn có thể quan tâm trong danh mục{' '}
                <strong>
                  {product.category === 'wedding' ? 'Cưới hỏi' :
                   product.category === 'birthday' ? 'Sinh nhật' :
                   product.category === 'anniversary' ? 'Kỷ niệm' :
                   product.category === 'sympathy' ? 'Chia buồn' : 'Quà tặng'}
                </strong>
              </p>
            </div>
            
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <Link to={`/products/${relatedProduct.id}`} className="product-link">
                    <div className="product-image-container">
                      <img src={relatedProduct.images[0]} alt={relatedProduct.name} loading="lazy" />
                      
                      {/* Product badges */}
                      <div className="product-badges">
                        {relatedProduct.badge && (
                          <span className="product-badge">{relatedProduct.badge}</span>
                        )}
                        {relatedProduct.originalPrice && (
                          <span className="discount-badge">
                            -{Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}%
                          </span>
                        )}
                      </div>
                      
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <span className="quick-view-text">Xem chi tiết</span>
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{relatedProduct.name}</h3>
                      
                      <div className="product-meta">
                        <div className="product-rating">
                          <div className="rating-stars small">
                            {renderStars(relatedProduct.rating)}
                          </div>
                          <span className="rating-count">({relatedProduct.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="product-price">
                        <span className="current-price">{formatPrice(relatedProduct.price)}</span>
                        {relatedProduct.originalPrice && (
                          <span className="original-price">{formatPrice(relatedProduct.originalPrice)}</span>
                        )}
                      </div>
                      
                      <div className="product-features">
                        <p className="short-description">{relatedProduct.shortDescription}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="section-footer">
              <div className="navigation-actions">
                <Link to={`/products?category=${product.category}`} className="btn btn-outline btn-lg">
                  <i className="fas fa-filter"></i>
                  <span>Xem thêm {product.category === 'wedding' ? 'Hoa cưới' :
                   product.category === 'birthday' ? 'Hoa sinh nhật' :
                   product.category === 'anniversary' ? 'Hoa kỷ niệm' :
                   product.category === 'sympathy' ? 'Hoa chia buồn' : 'Hoa quà tặng'}</span>
                </Link>
                
                <Link to="/products" className="btn btn-primary btn-lg">
                  <i className="fas fa-th-large"></i>
                  <span>Tất cả sản phẩm</span>
                </Link>
              </div>
              
              <div className="back-to-top">
                <button 
                  className="btn btn-secondary"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <i className="fas fa-arrow-up"></i>
                  <span>Về đầu trang</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="gallery-modal" onClick={() => setShowFullGallery(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowFullGallery(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="modal-image">
              <img src={product.images[activeImageIndex]} alt={product.name} />
            </div>
            
            <div className="modal-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`modal-thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;