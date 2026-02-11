import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import api from '../api';
import '../styles/product-detail.css';

const ProductDetail = () => {
  const { id, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setActiveImageIndex(0);
    setActiveTab('description');
    window.scrollTo(0, 0);

    const fetchProduct = slug
      ? api.getProductBySlug(slug)
      : api.getProduct(id);

    fetchProduct
      .then(data => {
        setProduct(data);

        // Fetch reviews for this product
        api.getReviews(data.id)
          .then(reviewData => {
            const items = Array.isArray(reviewData) ? reviewData : (reviewData.data || []);
            setReviews(items);
          })
          .catch(() => setReviews([]));

        // Fetch related products (same category)
        if (data.categoryId) {
          api.getProducts({ category: data.categoryId })
            .then(allProducts => {
              const items = Array.isArray(allProducts) ? allProducts : (allProducts.data || []);
              setRelatedProducts(items.filter(p => p.id !== data.id).slice(0, 3));
            })
            .catch(() => setRelatedProducts([]));
        }
      })
      .catch(err => {
        console.error('Failed to load product:', err);
        setError('Không tìm thấy sản phẩm');
      })
      .finally(() => setLoading(false));
  }, [id, slug]);

  // SEO meta tags
  useEffect(() => {
    if (product) {
      document.title = (product.metaTitle || product.name) + ` - ${settings.shop_name || ''}`;

      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', product.metaDescription || product.shortDescription || '');
      }
    }
    return () => {
      document.title = `${settings.shop_name || ''} - ${settings.slogan || ''}`;
    };
  }, [product, settings]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product?.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={i < Math.round(rating) ? 'fas fa-star' : 'far fa-star'}></i>
    ));
  };

  const getImages = () => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return product.images.map(img => ({
        url: api.imageUrl(img.url),
        alt: img.altText || product.name
      }));
    }
    return [{ url: 'https://via.placeholder.com/800x800?text=No+Image', alt: product.name }];
  };

  const zaloLink = settings.zalo_url || '#';
  const phoneNumber = settings.phone || '';

  if (loading) {
    return (
      <div className="pd-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
          Đang tải sản phẩm...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#999' }}>
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block', color: '#e74c3c' }}></i>
          <h2>{error || 'Không tìm thấy sản phẩm'}</h2>
          <Link to="/products" className="pd-btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            <i className="fas fa-arrow-left"></i> Quay lại sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const images = getImages();
  const categoryName = product.category?.name || 'Khác';
  const features = product.longDescription
    ? product.longDescription.split('\n').filter(line => line.startsWith('-') || line.startsWith('•')).map(line => line.replace(/^[-•]\s*/, ''))
    : [];
  const occasions = product.occasions
    ? (typeof product.occasions === 'string' ? product.occasions.split(',').map(s => s.trim()) : product.occasions)
    : [];

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
            <Link to={`/products?category=${product.categoryId}`}>
              {categoryName}
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
                  src={images[activeImageIndex]?.url}
                  alt={images[activeImageIndex]?.alt}
                  loading="eager"
                  onClick={() => setShowFullGallery(true)}
                />

                {product.badge && (
                  <span className="pd-badge pd-badge--hot">{product.badge}</span>
                )}
                {calculateDiscount() > 0 && (
                  <span className="pd-badge pd-badge--sale">-{calculateDiscount()}%</span>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      className="pd-gallery-nav pd-gallery-nav--prev"
                      onClick={() => setActiveImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="pd-gallery-nav pd-gallery-nav--next"
                      onClick={() => setActiveImageIndex((prev) =>
                        (prev + 1) % images.length
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

              {images.length > 1 && (
                <div className="pd-thumbs">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      className={`pd-thumb ${activeImageIndex === index ? 'pd-thumb--active' : ''}`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={image.url} alt={image.alt} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="pd-info">

              {/* Category + Badge */}
              <div className="pd-info-top">
                <Link to={`/products?category=${product.categoryId}`} className="pd-category">
                  {categoryName}
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
                  {renderStars(product.averageRating || 0)}
                </div>
                <span className="pd-rating-text">
                  {(product.averageRating || 0).toFixed(1)}/5
                </span>
                <span className="pd-rating-count">
                  ({product.reviewCount || reviews.length} đánh giá)
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
              {features.length > 0 && (
                <div className="pd-features">
                  <h3 className="pd-features-title">Đặc điểm nổi bật</h3>
                  <ul className="pd-features-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Occasions */}
              {occasions.length > 0 && (
                <div className="pd-occasions">
                  <h3 className="pd-occasions-title">Phù hợp cho dịp</h3>
                  <div className="pd-occasion-tags">
                    {occasions.map((occasion, index) => (
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
                      <small>{phoneNumber}</small>
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

              <button
                className={`pd-tab ${activeTab === 'reviews' ? 'pd-tab--active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <i className="fas fa-star"></i>
                <span>Đánh giá ({reviews.length})</span>
              </button>
            </div>

            <div className="pd-tabs-content">

              {/* Description */}
              {activeTab === 'description' && (
                <div className="pd-panel">
                  <h3>Mô tả sản phẩm</h3>
                  <div className="pd-panel-desc" style={{ whiteSpace: 'pre-line' }}>
                    {product.longDescription || product.shortDescription}
                  </div>

                  {features.length > 0 && (
                    <div className="pd-panel-features">
                      <h4>Đặc điểm nổi bật</h4>
                      <div className="pd-panel-features-grid">
                        {features.map((feature, index) => (
                          <div key={index} className="pd-panel-feature-item">
                            <i className="fas fa-check-circle"></i>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {occasions.length > 0 && (
                    <div className="pd-panel-occasions">
                      <h4>Phù hợp cho dịp</h4>
                      <div className="pd-panel-occasion-tags">
                        {occasions.map((occasion, index) => (
                          <span key={index} className="pd-panel-occasion-tag">{occasion}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <div className="pd-panel">
                  <div className="pd-reviews-summary">
                    <div className="pd-reviews-score">
                      <span className="pd-reviews-number">{(product.averageRating || 0).toFixed(1)}</span>
                      <div className="pd-reviews-stars">
                        {renderStars(product.averageRating || 0)}
                      </div>
                      <span className="pd-reviews-count">{reviews.length} đánh giá</span>
                    </div>

                    <div className="pd-reviews-bars">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviews.filter(r => r.rating === star).length;
                        const pct = reviews.length > 0 ? (count / reviews.length * 100) : 0;
                        return (
                          <div key={star} className="pd-review-bar">
                            <span>{star} <i className="fas fa-star"></i></span>
                            <div className="pd-review-bar-track">
                              <div
                                className="pd-review-bar-fill"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <span className="pd-review-bar-count">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pd-reviews-list">
                    {reviews.length === 0 && (
                      <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>
                        Chưa có đánh giá nào cho sản phẩm này.
                      </p>
                    )}
                    {reviews.map(review => (
                      <div key={review.id} className="pd-review-card">
                        <div className="pd-review-header">
                          <div className="pd-review-avatar">
                            {review.customerName ? review.customerName.charAt(0) : '?'}
                          </div>
                          <div className="pd-review-meta">
                            <h4>{review.customerName || 'Khách hàng'}</h4>
                            <div className="pd-review-info">
                              <div className="pd-review-stars">{renderStars(review.rating)}</div>
                              <span>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                        </div>
                        <p className="pd-review-text">{review.comment}</p>
                      </div>
                    ))}
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
              <p>Có thể bạn quan tâm trong danh mục <strong>{categoryName}</strong></p>
            </div>

            <div className="pd-related-grid">
              {relatedProducts.map(rp => {
                const rpImg = rp.images && rp.images.length > 0
                  ? api.imageUrl(rp.images[0].url)
                  : 'https://via.placeholder.com/400';
                const rpAlt = rp.images?.[0]?.altText || rp.name;
                return (
                  <Link key={rp.id} to={rp.slug ? `/san-pham/${rp.slug}` : `/products/${rp.id}`} className="pd-related-card">
                    <div className="pd-related-img">
                      <img src={rpImg} alt={rpAlt} loading="lazy" />
                      <div className="pd-related-overlay">
                        <span>Xem chi tiết <i className="fas fa-arrow-right"></i></span>
                      </div>
                    </div>
                    <div className="pd-related-body">
                      <h3>{rp.name}</h3>
                      <div className="pd-related-stars">
                        {renderStars(rp.averageRating || 0)}
                        <span>({rp.reviewCount || 0})</span>
                      </div>
                      <div className="pd-related-price">
                        <span className="pd-price">{formatPrice(rp.price)}</span>
                        {rp.originalPrice && (
                          <span className="pd-price-old">{formatPrice(rp.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
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

      {/* Full gallery modal */}
      {showFullGallery && (
        <div className="pd-modal" onClick={() => setShowFullGallery(false)}>
          <div className="pd-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pd-modal-close" onClick={() => setShowFullGallery(false)}>
              <i className="fas fa-times"></i>
            </button>
            <img src={images[activeImageIndex]?.url} alt={images[activeImageIndex]?.alt} />
            {images.length > 1 && (
              <div className="pd-modal-nav">
                <button onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span>{activeImageIndex + 1} / {images.length}</span>
                <button onClick={() => setActiveImageIndex(prev => (prev + 1) % images.length)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;