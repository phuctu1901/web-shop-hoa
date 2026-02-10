import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>BloomStore</h3>
            <p>Mang vẻ đẹp thiên nhiên vào cuộc sống với những bó hoa tươi cao cấp được tuyển chọn kỹ lưỡng.</p>
            <div className="footer-social">
              <a href="https://zalo.me/bloomstore" className="social-link">
                <i className="fas fa-comments"></i>
              </a>
              <a href="https://facebook.com/bloomstore" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/bloomstore" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Sản phẩm</h4>
            <ul>
              <li><a href="#hoa-cuoi">Hoa cưới</a></li>
              <li><a href="#hoa-sinh-nhat">Hoa sinh nhật</a></li>
              <li><a href="#hoa-ky-niem">Hoa kỷ niệm</a></li>
              <li><a href="#hoa-chia-buon">Hoa chia buồn</a></li>
              <li><a href="#hoa-tang">Hoa tặng</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Dịch vụ</h4>
            <ul>
              <li><a href="#giao-hoa">Giao hoa tận nơi</a></li>
              <li><a href="#thiet-ke">Thiết kế theo yêu cầu</a></li>
              <li><a href="#trang-tri">Trang trí sự kiện</a></li>
              <li><a href="#dat-hoa">Đặt hoa định kỳ</a></li>
              <li><a href="#tu-van">Tư vấn chuyên nghiệp</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#chinh-sach-giao-hang">Chính sách giao hàng</a></li>
              <li><a href="#chinh-sach-doi-tra">Chính sách đổi trả</a></li>
              <li><a href="#huong-dan">Hướng dẫn đặt hàng</a></li>
              <li><a href="#faq">Câu hỏi thường gặp</a></li>
              <li><a href="#lien-he">Liên hệ hỗ trợ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2026 BloomStore. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className="footer-payment">
            <span>Phương thức thanh toán:</span>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-paypal"></i>
              <i className="fas fa-money-bill-wave"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;