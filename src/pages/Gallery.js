import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge, faHeart, faExpand, faTimes,
  faChevronLeft, faChevronRight, faSeedling,
  faGift, faGlassCheers, faPalette, faLeaf,
} from '@fortawesome/free-solid-svg-icons';
import { apiFetch } from '../api';
import { usePageTitle } from '../hooks/usePageTitle';

/* ────────────────────────────────
   Category meta (icon + label)
   ──────────────────────────────── */
const CATEGORY_META = {
  wedding: { label: 'Hoa cưới', icon: faHeart },
  birthday: { label: 'Sinh nhật', icon: faGift },
  event: { label: 'Sự kiện', icon: faGlassCheers },
  bouquet: { label: 'Bó hoa', icon: faSeedling },
  decor: { label: 'Trang trí', icon: faPalette },
};

/* ────────────────────────────────
   Repeating 4×3 tile pattern
   Each entry: [colSpan, rowSpan]
   Fills a 4-col block perfectly.
   ──────────────────────────────── */
const TILE_PATTERN = [
  [2, 2],  // 0 — large square
  [1, 1],  // 1 — small
  [1, 1],  // 2 — small
  [1, 2],  // 3 — tall
  [1, 1],  // 4 — small
  [2, 1],  // 5 — wide
  [1, 1],  // 6 — small
  [1, 1],  // 7 — small
  [1, 1],  // 8 — small
  [2, 1],  // 9 — wide
  [1, 1],  // 10 — small
];

function getSpan(index) {
  const patternIdx = index % TILE_PATTERN.length;
  const [col, row] = TILE_PATTERN[patternIdx];
  return { colSpan: col, rowSpan: row };
}

/* ────────────────────────────────
   Gallery Component
   ──────────────────────────────── */
export default function Gallery() {
  usePageTitle('Bộ sưu tập');
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  /* ── Fetch data from API ── */
  useEffect(() => {
    async function load() {
      try {
        const [itemsRes, catsRes] = await Promise.all([
          apiFetch('/api/gallery'),
          apiFetch('/api/gallery/categories'),
        ]);
        setItems(itemsRes);
        setCategories(catsRes);
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ── Filter items ── */
  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(i => i.category === activeFilter);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '60px' }
    );
    const grid = gridRef.current;
    if (grid) {
      grid.querySelectorAll('.gallery-item').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, [filteredItems]);

  /* ── Lightbox ── */
  const openLightbox = useCallback((idx) => setLightbox({ open: true, index: idx }), []);
  const closeLightbox = useCallback(() => setLightbox({ open: false, index: 0 }), []);
  const prevImage = useCallback(() => {
    setLightbox(p => ({ ...p, index: (p.index - 1 + filteredItems.length) % filteredItems.length }));
  }, [filteredItems.length]);
  const nextImage = useCallback(() => {
    setLightbox(p => ({ ...p, index: (p.index + 1) % filteredItems.length }));
  }, [filteredItems.length]);

  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox.open, closeLightbox, prevImage, nextImage]);

  /* ── Like handler ── */
  const handleLike = async (e, itemId) => {
    e.stopPropagation();
    try {
      const updated = await apiFetch(`/api/gallery/${itemId}/like`, { method: 'POST' });
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, likes: updated.likes } : i));
    } catch { /* silent */ }
  };

  const totalCount = items.length;
  const categoryCount = categories.length;

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="gallery-spinner" />
        <p>Đang tải bộ sưu tập...</p>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <div className="hero-circle hero-circle-1" />
          <div className="hero-circle hero-circle-2" />
        </div>
        <div className="container">
          <div className="gallery-hero-inner">
            <p className="breadcrumb">
              <Link to="/">Trang chủ</Link> &rsaquo; <span>Bộ sưu tập</span>
            </p>
            <h1 className="gallery-hero-title">
              Bộ sưu tập <em>ảnh đẹp</em>
            </h1>
            <p className="gallery-hero-desc">
              Khám phá những tác phẩm hoa nghệ thuật được tuyển chọn
              từ đội ngũ florist chuyên nghiệp của chúng tôi
            </p>
            <div className="gallery-hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">{totalCount}+</span>
                <span className="hero-stat-label">Tác phẩm</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">{categoryCount}</span>
                <span className="hero-stat-label">Bộ sưu tập</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">100%</span>
                <span className="hero-stat-label">Hoa thật</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="gallery-filter-section">
        <div className="container">
          <div className="filter-bar">
            <button
              className={`filter-chip ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              <FontAwesomeIcon icon={faThLarge} />
              Tất cả
              <span className="filter-count">{totalCount}</span>
            </button>
            {categories.map(cat => {
              const meta = CATEGORY_META[cat.category] || { label: cat.category, icon: faLeaf };
              return (
                <button
                  key={cat.category}
                  className={`filter-chip ${activeFilter === cat.category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat.category)}
                >
                  <FontAwesomeIcon icon={meta.icon} />
                  {meta.label}
                  <span className="filter-count">{cat.count}</span>
                </button>
              );
            })}
          </div>
          <p className="filter-result-count">
            Hiển thị <strong>{filteredItems.length}</strong> ảnh
            {activeFilter !== 'all' && ` trong ${CATEGORY_META[activeFilter]?.label || activeFilter}`}
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-grid" ref={gridRef}>
            {filteredItems.map((item, idx) => {
              const { colSpan, rowSpan } = getSpan(idx);
              return (
                <div
                  key={item.id}
                  className="gallery-item"
                  style={{
                    gridColumn: `span ${colSpan}`,
                    gridRow: `span ${rowSpan}`,
                  }}
                  onClick={() => openLightbox(idx)}
                >
                  <div className="gallery-item-inner">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="overlay-top">
                        <span className="gallery-category-tag">
                          {CATEGORY_META[item.category]?.label || item.category}
                        </span>
                      </div>
                      <div className="overlay-bottom">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="overlay-actions">
                          <button
                            className="like-btn"
                            onClick={(e) => handleLike(e, item.id)}
                          >
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{item.likes}</span>
                          </button>
                          <span className="view-btn">
                            <FontAwesomeIcon icon={faExpand} /> Xem
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gallery-cta">
        <div className="container">
          <div className="gallery-cta-inner">
            <div className="cta-text">
              <h2>Muốn có tác phẩm hoa riêng cho bạn?</h2>
              <p>Liên hệ chúng tôi để được tư vấn thiết kế hoa theo yêu cầu</p>
            </div>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn primary">
                <FontAwesomeIcon icon={faSeedling} /> Liên hệ ngay
              </Link>
              <Link to="/products" className="cta-btn secondary">
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox.open && filteredItems[lightbox.index] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="lightbox-container" onClick={e => e.stopPropagation()}>
            <button className="lightbox-nav" onClick={prevImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="lightbox-content">
              <div className="lightbox-image-wrapper">
                <img
                  src={filteredItems[lightbox.index].imageUrl}
                  alt={filteredItems[lightbox.index].title}
                />
              </div>
              <div className="lightbox-info">
                <span className="lightbox-category">
                  {CATEGORY_META[filteredItems[lightbox.index].category]?.label || filteredItems[lightbox.index].category}
                </span>
                <h3>{filteredItems[lightbox.index].title}</h3>
                <p>{filteredItems[lightbox.index].description}</p>
                <div className="lightbox-meta">
                  <span>
                    <FontAwesomeIcon icon={faHeart} /> {filteredItems[lightbox.index].likes} lượt thích
                  </span>
                  <span className="lightbox-counter">
                    {lightbox.index + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
            <button className="lightbox-nav" onClick={nextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
