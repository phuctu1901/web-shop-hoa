# BloomStore - Shop Hoa Tươi Cao Cấp

Một landing page hiện đại và responsive cho shop hoa tươi, được thiết kế với phong cách elegant và user experience tối ưu.

## ✨ Tính năng

### 🎨 Thiết kế
- **Hiện đại & Elegant**: Sử dụng typography đẹp mắt với Playfair Display và Inter
- **Responsive Design**: Tối ưu cho desktop, tablet và mobile
- **Dark Mode Ready**: Có thể dễ dàng thêm dark mode
- **Smooth Animations**: Hiệu ứng mượt mà và chuyên nghiệp

### 🛍️ Chức năng E-commerce
- **Product Catalog**: Hiển thị sản phẩm với filter theo danh mục
- **Quick View**: Xem nhanh thông tin sản phẩm
- **Shopping Cart**: Thêm sản phẩm vào giỏ hàng (lưu trong localStorage)
- **Product Rating**: Hệ thống đánh giá sao

### 📧 Tương tác khách hàng
- **Contact Form**: Form liên hệ với validation
- **Testimonials**: Hiển thị đánh giá khách hàng
- **Newsletter**: Đăng ký nhận thông tin
- **Social Media Integration**: Kết nối mạng xã hội

### 🚀 Hiệu suất
- **Optimized Images**: Sử dụng Unsplash với optimization
- **Fast Loading**: CSS và JS được tối ưu
- **SEO Friendly**: Meta tags và semantic HTML
- **Accessibility**: ARIA labels và keyboard navigation

## 📁 Cấu trúc thư mục

```
flower-store/
├── index.html          # Trang chính
├── css/
│   └── style.css       # Stylesheet chính
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # Documentation
```

## 🎯 Sections

### 1. **Header & Navigation**
- Logo với tagline
- Menu navigation responsive
- Shopping cart với counter
- Mobile hamburger menu

### 2. **Hero Section**
- Background hero với overlay
- Call-to-action buttons
- Statistics showcase
- Parallax scrolling effect

### 3. **Featured Products**
- Product grid với hover effects
- Category filtering
- Quick view modal
- Add to cart functionality

### 4. **Services**
- Service cards với icons
- Hover animations
- Clean layout

### 5. **About Section**
- Company story
- Feature highlights
- Statistics badge
- Split layout với image

### 6. **Testimonials**
- Customer reviews
- Star ratings
- Profile photos
- Carousel layout

### 7. **Contact Section**
- Contact information
- Working contact form
- Social media links
- Location details

### 8. **Footer**
- Multi-column layout
- Quick links
- Payment methods
- Copyright information

## 🎨 Color Palette

```css
Primary Colors:
- Brown: #8B4513 (Saddle Brown)
- Dark Brown: #A0522D
- Dark Green: #2C3E2D
- Gold: #FFD700

Neutral Colors:
- White: #FFFFFF
- Light Gray: #FAFAFA
- Medium Gray: #666666
- Dark: #333333
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript ES6+**: Modern JavaScript
- **Font Awesome**: Icons
- **Google Fonts**: Typography
- **Unsplash**: High-quality images

## 🚀 Setup Instructions

1. **Clone hoặc download project**
2. **Mở index.html trong browser**
3. **Hoặc sử dụng live server cho development**

```bash
# Nếu sử dụng VS Code Live Server
# Cài đặt extension Live Server
# Right-click index.html và chọn "Open with Live Server"
```

## 📈 Performance Optimization

### Images
- Sử dụng Unsplash API với parameters optimization
- Lazy loading cho images (có thể thêm)
- WebP format support (có thể upgrade)

### CSS
- Minification ready
- Critical CSS inline (có thể thêm)
- CSS Grid và Flexbox cho layout hiệu quả

### JavaScript
- Event delegation
- Intersection Observer API
- LocalStorage cho cart data

## 🎉 Features Ready for Enhancement

### 🛍️ E-commerce
- [ ] Product search functionality
- [ ] Wishlist feature
- [ ] Product reviews system
- [ ] Checkout process
- [ ] Payment integration

### 📱 Progressive Web App
- [ ] Service worker
- [ ] Offline functionality
- [ ] Push notifications
- [ ] App manifest

### 🎨 Advanced UI
- [ ] Dark mode toggle
- [ ] Product image zoom
- [ ] 360° product view
- [ ] Advanced filtering

### 🔧 Backend Integration
- [ ] REST API connection
- [ ] User authentication
- [ ] Order management
- [ ] Inventory tracking

## 🎨 Customization Guide

### Colors
Thay đổi color scheme trong CSS variables:

```css
:root {
  --primary-color: #8B4513;
  --secondary-color: #A0522D;
  --accent-color: #FFD700;
  --text-dark: #2C3E2D;
}
```

### Fonts
Thay đổi typography:

```css
/* Heading font */
.hero-title, .section-title {
  font-family: 'Your-Font', serif;
}

/* Body font */
body {
  font-family: 'Your-Font', sans-serif;
}
```

### Layout
Adjust container max-width:

```css
.container {
  max-width: 1200px; /* Thay đổi theo ý muốn */
}
```

## 📞 Support

Nếu bạn cần hỗ trợ hoặc có questions:
- Email: support@bloomstore.vn
- Phone: +84 901 234 567

## 📄 License

Tự do sử dụng cho personal và commercial projects.

---

**Developed with ❤️ for BloomStore**