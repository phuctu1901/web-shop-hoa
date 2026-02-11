import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { usePageTitle } from '../hooks/usePageTitle';
import PageHeader from '../components/PageHeader';
import api from '../api';

const Products = () => {
  const { settings } = useSettings();
  usePageTitle('Sản phẩm');
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('default');

  // Fetch categories
  useEffect(() => {
    api.getCategories()
      .then(data => {
        // Use slug as filter key since backend filters by cat.slug
        setCategories([{ slug: 'all', name: 'Tất cả' }, ...data]);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
        setCategories([{ slug: 'all', name: 'Tất cả' }]);
      });
  }, []);

  // Fetch products (re-fetch when filter changes)
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filter !== 'all') params.category = filter;
    if (sortBy !== 'default') params.sort = sortBy;

    api.getProducts(params)
      .then(data => {
        const items = Array.isArray(data) ? data : (data.data || data.items || []);
        setProducts(items);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [filter, sortBy]);

  // Update filter from URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setFilter(cat);
  }, [searchParams]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= Math.round(rating) ? 'fas fa-star' : 'far fa-star'}
        ></i>
      );
    }
    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Get first image URL for a product
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return api.imageUrl(product.images[0].url);
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  // Get first image alt text
  const getProductAlt = (product) => {
    if (product.images && product.images.length > 0 && product.images[0].altText) {
      return product.images[0].altText;
    }
    return product.name;
  };

  // Client-side sort for sorted display
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Bộ sưu tập hoa tươi"
        subtitle="Khám phá những bó hoa tuyệt đẹp được tuyển chọn kỹ lưỡng cho mọi dịp đặc biệt"
        breadcrumb={[
          { text: 'Trang chủ', link: '/' },
          { text: 'Sản phẩm' }
        ]}
      />

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          {/* Filters */}
          <div className="products-filters">
            <div className="filter-group">
              <h3>Danh mục</h3>
              <div className="product-categories">
                {categories.map(category => (
                  <button
                    key={category.slug}
                    className={`category-btn ${filter === category.slug ? 'active' : ''}`}
                    onClick={() => setFilter(category.slug)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Sắp xếp theo</h3>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Mặc định</option>
                <option value="price-low">Giá: Thấp đến cao</option>
                <option value="price-high">Giá: Cao đến thấp</option>
                <option value="newest">Mới nhất</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}></i>
              Đang tải sản phẩm...
            </div>
          )}

          {/* Empty state */}
          {!loading && sortedProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
              <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <p>Không tìm thấy sản phẩm nào trong danh mục này</p>
              <button className="btn btn-primary" onClick={() => setFilter('all')} style={{ marginTop: '1rem' }}>
                Xem tất cả sản phẩm
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <div key={product.id} className="product-card" data-category={product.category?.name}>
                  <div className="product-image">
                    <img
                      src={getProductImage(product)}
                      alt={getProductAlt(product)}
                      loading="lazy"
                    />
                    <div className="product-overlay">
                      <Link to={product.slug ? `/san-pham/${product.slug}` : `/products/${product.id}`} className="btn-quick-view">Xem chi tiết</Link>
                      <a href={settings.zalo_url || 'https://zalo.me'} className="btn-contact" target="_blank" rel="noopener noreferrer">Liên hệ đặt hàng</a>
                    </div>
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                  </div>
                  <div className="product-info">
                    <Link to={product.slug ? `/san-pham/${product.slug}` : `/products/${product.id}`}>
                      <h3 className="product-name">{product.name}</h3>
                    </Link>
                    <p className="product-description">{product.shortDescription}</p>
                    <div className="product-rating">
                      {renderStars(product.averageRating || 0)}
                      <span>({product.reviewCount || 0} đánh giá)</span>
                    </div>
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
          )}
        </div>
      </section>
    </>
  );
};

export default Products;