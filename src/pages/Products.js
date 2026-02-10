import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const Products = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const products = [
    {
      id: 1,
      name: 'Bó hoa cưới Romantic',
      category: 'wedding',
      price: 1200000,
      originalPrice: 1500000,
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=400&fit=crop',
      description: 'Hoa hồng trắng và baby breath tinh tế',
      rating: 5,
      reviews: 24,
      badge: 'Bán chạy'
    },
    {
      id: 2,
      name: 'Bó hoa cưới Vintage',
      category: 'wedding',
      price: 1400000,
      image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=400&fit=crop',
      description: 'Hoa hồng champagne và eucalyptus',
      rating: 4,
      reviews: 18
    },
    {
      id: 3,
      name: 'Bó hoa sinh nhật rực rỡ',
      category: 'birthday',
      price: 800000,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
      description: 'Hoa hướng dương và hoa hồng cam',
      rating: 4,
      reviews: 15
    },
    {
      id: 4,
      name: 'Hộp hoa kỷ niệm',
      category: 'anniversary',
      price: 1800000,
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop',
      description: 'Hoa hồng đỏ trong hộp sang trọng',
      rating: 5,
      reviews: 31,
      badge: 'Mới'
    },
    {
      id: 5,
      name: 'Bó hoa chia buồn',
      category: 'sympathy',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop',
      description: 'Hoa lily trắng và lá dương xỉ',
      rating: 5,
      reviews: 12
    },
    {
      id: 6,
      name: 'Bó hoa quà tặng',
      category: 'gift',
      price: 750000,
      image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop',
      description: 'Cẩm tú cầu xanh dương tươi mát',
      rating: 4,
      reviews: 20
    }
  ];

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'wedding', label: 'Cưới hỏi' },
    { value: 'birthday', label: 'Sinh nhật' },
    { value: 'anniversary', label: 'Kỷ niệm' },
    { value: 'sympathy', label: 'Chia buồn' },
    { value: 'gift', label: 'Quà tặng' }
  ];

  const filteredProducts = products.filter(product =>
    filter === 'all' || product.category === filter
  );

  // Sort products based on sortBy value
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id; // Assuming higher ID = newer
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // Keep original order
    }
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= rating ? 'fas fa-star' : 'far fa-star'}
        ></i>
      );
    }
    return stars;
  };

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
                    key={category.value}
                    className={`category-btn ${filter === category.value ? 'active' : ''}`}
                    onClick={() => setFilter(category.value)}
                  >
                    {category.label}
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

          {/* Products Grid */}
          <div className="products-grid">
            {sortedProducts.map(product => (
              <div key={product.id} className="product-card" data-category={product.category}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <Link to={`/products/${product.id}`} className="btn-quick-view">Xem chi tiết</Link>
                    <a href="https://zalo.me/bloomstore" className="btn-contact">Liên hệ đặt hàng</a>
                  </div>
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                </div>
                <div className="product-info">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <p className="product-description">{product.description}</p>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span>({product.reviews} đánh giá)</span>
                  </div>
                  <div className="product-price">
                    <span className="price-current">{product.price.toLocaleString('vi-VN')}đ</span>
                    {product.originalPrice && (
                      <span className="price-original">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;