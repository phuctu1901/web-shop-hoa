import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';
import * as bcrypt from 'bcrypt';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { ProductImage } from './products/product-image.entity';
import { Review } from './reviews/review.entity';
import { AdminUser } from './auth/admin-user.entity';
import { SiteSetting } from './settings/setting.entity';
import { GalleryItem } from './gallery/gallery-item.entity';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const ds = app.get(DataSource);

    const catRepo = ds.getRepository(Category);
    const prodRepo = ds.getRepository(Product);
    const imgRepo = ds.getRepository(ProductImage);
    const reviewRepo = ds.getRepository(Review);
    const userRepo = ds.getRepository(AdminUser);

    console.log('🌱 Seeding database...');

    // Clear existing data
    await ds.query('SET FOREIGN_KEY_CHECKS = 0');
    await ds.query('TRUNCATE TABLE reviews');
    await ds.query('TRUNCATE TABLE product_images');
    await ds.query('TRUNCATE TABLE products');
    await ds.query('TRUNCATE TABLE categories');
    await ds.query('TRUNCATE TABLE admin_users');
    await ds.query('TRUNCATE TABLE site_settings');
    await ds.query('SET FOREIGN_KEY_CHECKS = 1');

    // Categories
    const categories = await catRepo.save([
        { slug: 'wedding', name: 'Hoa cưới', description: 'Các loại hoa dành cho đám cưới' },
        { slug: 'birthday', name: 'Hoa sinh nhật', description: 'Hoa tươi cho ngày sinh nhật' },
        { slug: 'anniversary', name: 'Hoa kỷ niệm', description: 'Hoa cho dịp kỷ niệm đặc biệt' },
        { slug: 'congratulation', name: 'Hoa chúc mừng', description: 'Hoa chúc mừng khai trương, tốt nghiệp' },
        { slug: 'sympathy', name: 'Hoa chia buồn', description: 'Hoa chia sẻ đồng cảm' },
    ]);
    console.log(`  ✓ ${categories.length} categories`);

    const catMap: Record<string, number> = {};
    for (const c of categories) catMap[c.slug] = c.id;

    // Products
    const productsData = [
        {
            name: 'Bó hoa cưới Romantic',
            categoryId: catMap['wedding'],
            shortDescription: 'Hoa hồng trắng và baby breath tinh tế',
            longDescription: 'Bó hoa cưới Romantic là tác phẩm nghệ thuật được chế tác từ những bông hoa hồng trắng Ecuador cao cấp, kết hợp cùng baby breath tạo nên vẻ đẹp tinh khôi, lãng mạn.',
            price: 1200000,
            originalPrice: 1500000,
            badge: 'Bán chạy',
            rating: 5,
            reviewCount: 24,
            features: ['25 hoa hồng trắng Ecuador cao cấp', '15 cành baby breath tươi mới', 'Giấy gói lụa cao cấp màu trắng', 'Ribbon satin sang trọng', 'Thiết kế bởi florist chuyên nghiệp', 'Bảo quản tươi 10-14 ngày'],
            specifications: { 'Kích thước': '35cm x 45cm', 'Chiều cao': '50-55cm', 'Trọng lượng': '1.2kg', 'Số lượng hoa': '40 bông', 'Nguồn gốc': 'Ecuador, New Zealand' },
            careInstructions: ['Cắt thân hoa xiên 2-3cm trong nước chảy', 'Thay nước mỗi 2 ngày, rửa sạch bình', 'Thêm 1 thìa đường hoặc dung dịch dưỡng hoa', 'Đặt nơi mát mẻ, tránh ánh nắng trực tiếp'],
            occasions: ['Đám cưới', 'Lễ đính hôn', 'Kỷ niệm ngày cưới', 'Chụp ảnh cưới'],
            images: [
                'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1594736797933-d0282ba6205c?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
            ],
        },
        {
            name: 'Bó hoa cưới Vintage',
            categoryId: catMap['wedding'],
            shortDescription: 'Hoa hồng champagne và eucalyptus',
            longDescription: 'Bộ sưu tập Vintage mang phong cách cổ điển, thanh lịch với tông màu champagne ấm áp.',
            price: 1400000,
            originalPrice: undefined,
            rating: 4,
            reviewCount: 18,
            features: ['20 hoa hồng champagne Ecuador', '12 cành eucalyptus tươi', 'Giấy kraft vintage', 'Ribbon jute tự nhiên'],
            occasions: ['Đám cưới vintage', 'Tiệc garden party', 'Chụp ảnh pre-wedding'],
            images: [
                'https://images.unsplash.com/photo-1594736797933-d0282ba6205c?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop',
            ],
        },
        {
            name: 'Bó hoa sinh nhật rực rỡ',
            categoryId: catMap['birthday'],
            shortDescription: 'Hoa hướng dương và hoa hồng cam',
            longDescription: 'Bó hoa sinh nhật tràn đầy năng lượng với sự kết hợp rực rỡ giữa hoa hướng dương và hoa hồng cam.',
            price: 800000,
            rating: 4,
            reviewCount: 15,
            features: ['6 hoa hướng dương tươi', '12 hoa hồng cam Ecuador', 'Lá xanh trang trí', 'Giấy gói màu sắc rực rỡ'],
            occasions: ['Sinh nhật', 'Chúc mừng', 'Động viên'],
            images: [
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop',
            ],
        },
        {
            name: 'Hộp hoa kỷ niệm',
            categoryId: catMap['anniversary'],
            shortDescription: 'Hoa hồng đỏ trong hộp sang trọng',
            longDescription: 'Hộp hoa sang trọng với hoa hồng đỏ Ecuador, phù hợp cho các dịp kỷ niệm đặc biệt.',
            price: 1800000,
            badge: 'Premium',
            rating: 5,
            reviewCount: 31,
            features: ['30 hoa hồng đỏ Ecuador', 'Hộp đựng cao cấp', 'Nơ lụa sang trọng', 'Thiệp chúc mừng'],
            occasions: ['Kỷ niệm', 'Valentine', 'Ngày phụ nữ'],
            images: [
                'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
            ],
        },
        {
            name: 'Bó hoa chúc mừng khai trương',
            categoryId: catMap['congratulation'],
            shortDescription: 'Hoa lan hồ điệp và hoa ly',
            longDescription: 'Bó hoa sang trọng phù hợp cho dịp khai trương, chúc mừng thành công.',
            price: 2500000,
            originalPrice: 3000000,
            rating: 5,
            reviewCount: 12,
            features: ['5 cành lan hồ điệp', '10 bông hoa ly', 'Lá monstera trang trí', 'Giấy gói cao cấp'],
            occasions: ['Khai trương', 'Tốt nghiệp', 'Thăng chức'],
            images: [
                'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800&h=800&fit=crop',
                'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop',
            ],
        },
        {
            name: 'Bó hoa cúc trắng chia buồn',
            categoryId: catMap['sympathy'],
            shortDescription: 'Hoa cúc trắng và hoa ly trắng',
            longDescription: 'Bó hoa chia buồn trang nghiêm với hoa cúc trắng và hoa ly trắng tinh khôi.',
            price: 600000,
            rating: 4,
            reviewCount: 8,
            features: ['20 bông hoa cúc trắng', '5 bông hoa ly trắng', 'Giấy gói trắng thanh lịch', 'Ribbon trắng'],
            occasions: ['Chia buồn', 'Viếng'],
            images: [
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=800&fit=crop',
            ],
        },
    ];

    for (const pData of productsData) {
        const { images, ...productFields } = pData;
        const entity = prodRepo.create(productFields as any);
        const product = await prodRepo.save(entity) as unknown as Product;

        if (images?.length) {
            const imgs = images.map((url, i) => imgRepo.create({ productId: product.id, url, sortOrder: i }));
            await imgRepo.save(imgs);
        }
    }
    console.log(`  ✓ ${productsData.length} products with images`);

    // Sample reviews
    const allProducts = await prodRepo.find();
    const sampleReviews = [
        { productId: allProducts[0].id, reviewerName: 'Nguyễn Thị Lan', rating: 5, comment: 'Hoa rất đẹp, đúng như hình. Giao hàng nhanh!', verified: true },
        { productId: allProducts[0].id, reviewerName: 'Trần Minh Tuấn', rating: 5, comment: 'Vợ mình rất thích. Hoa tươi lâu được 12 ngày.', verified: true },
        { productId: allProducts[0].id, reviewerName: 'Lê Hoàng Anh', rating: 4, comment: 'Đẹp lắm, chỉ hơi nhỏ hơn mình tưởng.', verified: false },
        { productId: allProducts[1].id, reviewerName: 'Phạm Thu Hà', rating: 5, comment: 'Phong cách vintage rất đẹp và lãng mạn!', verified: true },
        { productId: allProducts[2].id, reviewerName: 'Võ Đức Thắng', rating: 4, comment: 'Màu sắc rực rỡ, bạn gái rất thích.', verified: true },
        { productId: allProducts[3].id, reviewerName: 'Hoàng Thị Mai', rating: 5, comment: 'Hộp hoa sang trọng, đúng dịp kỷ niệm.', verified: true },
    ];
    await reviewRepo.save(sampleReviews.map((r) => reviewRepo.create(r)));
    console.log(`  ✓ ${sampleReviews.length} reviews`);

    // Admin user
    const hash = await bcrypt.hash('admin123', 10);
    await userRepo.save(userRepo.create({ username: 'admin', passwordHash: hash }));
    console.log('  ✓ Admin user (admin / admin123)');

    // Site settings
    const settingRepo = ds.getRepository(SiteSetting);
    const defaultSettings = [
        { key: 'shop_name', value: 'BloomStore', label: 'Tên cửa hàng', type: 'text' },
        { key: 'slogan', value: 'Premium Flowers', label: 'Slogan', type: 'text' },
        { key: 'favicon_url', value: '', label: 'Favicon URL', type: 'url' },
        { key: 'logo_url', value: '', label: 'Logo URL', type: 'url' },
        { key: 'meta_title', value: 'BloomStore - Hoa Tươi Cao Cấp | Giao Hàng Toàn Quốc', label: 'Meta Title (SEO)', type: 'text' },
        { key: 'meta_description', value: 'BloomStore - Cửa hàng hoa tươi cao cấp. Đa dạng hoa cưới, hoa sinh nhật, hoa kỷ niệm, hoa chúc mừng. Thiết kế độc đáo, giao hàng nhanh toàn quốc.', label: 'Meta Description (SEO)', type: 'textarea' },
        { key: 'meta_keywords', value: 'hoa tươi, hoa cưới, hoa sinh nhật, hoa kỷ niệm, hoa chúc mừng, giao hoa, shop hoa, bloomstore', label: 'Meta Keywords (SEO)', type: 'text' },
        { key: 'og_image', value: '', label: 'OG Image URL (chia sẻ mạng xã hội)', type: 'url' },
        { key: 'phone', value: '0123 456 789', label: 'Số điện thoại', type: 'text' },
        { key: 'email', value: 'hello@bloomstore.vn', label: 'Email', type: 'text' },
        { key: 'address', value: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh', label: 'Địa chỉ', type: 'text' },
        { key: 'zalo_url', value: 'https://zalo.me/bloomstore', label: 'Zalo URL', type: 'url' },
        { key: 'facebook_url', value: 'https://facebook.com/bloomstore', label: 'Facebook URL', type: 'url' },
        { key: 'instagram_url', value: 'https://instagram.com/bloomstore', label: 'Instagram URL', type: 'url' },
        { key: 'google_map_url', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326648243056!2d106.69741731527314!3d10.775431892323178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2sNguyen%20Hue%20Walking%20Street!5e0!3m2!1sen!2s!4v1640995200000!5m2!1sen!2s', label: 'Google Map Embed URL', type: 'url' },
    ];
    await settingRepo.save(defaultSettings.map(s => settingRepo.create(s)));
    console.log(`  ✓ ${defaultSettings.length} site settings`);

    // Gallery Items
    const galleryRepo = ds.getRepository(GalleryItem);
    try { await ds.query('TRUNCATE TABLE gallery_items'); } catch { /* table may not exist yet */ }
    const galleryItems = [
        { title: 'Hoa cưới cổ điển', description: 'Bó hoa hồng trắng tinh khôi cho ngày trọng đại', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop', likes: 234, sortOrder: 1 },
        { title: 'Bó hoa pastel', description: 'Sắc màu nhẹ nhàng cho mọi dịp', category: 'bouquet', imageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&h=1200&fit=crop', likes: 189, sortOrder: 2 },
        { title: 'Trang trí tiệc cưới', description: 'Không gian tiệc cưới lãng mạn với hoa tươi', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=600&fit=crop', likes: 312, sortOrder: 3 },
        { title: 'Hoa sinh nhật', description: 'Bó hoa rực rỡ cho ngày sinh nhật thêm vui', category: 'birthday', imageUrl: 'https://images.unsplash.com/photo-1562932831-afcfe735e9d5?w=800&h=800&fit=crop', likes: 156, sortOrder: 4 },
        { title: 'Hoa trang trí bàn', description: 'Trung tâm bàn tiệc sang trọng với hoa tươi', category: 'decor', imageUrl: 'https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=800&h=600&fit=crop', likes: 201, sortOrder: 5 },
        { title: 'Hoa sự kiện', description: 'Trang trí sân khấu sự kiện với hoa cao cấp', category: 'event', imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=1000&fit=crop', likes: 245, sortOrder: 6 },
        { title: 'Bó hoa tulip', description: 'Tulip Holland nhập khẩu tươi mỗi ngày', category: 'bouquet', imageUrl: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=800&h=1100&fit=crop', likes: 178, sortOrder: 7 },
        { title: 'Hoa chúc mừng', description: 'Kệ hoa chúc mừng khai trương hoành tráng', category: 'event', imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&h=800&fit=crop', likes: 267, sortOrder: 8 },
        { title: 'Bó hồng đỏ', description: 'Hoa hồng đỏ Ecuador — biểu tượng tình yêu', category: 'bouquet', imageUrl: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=1000&fit=crop', likes: 345, sortOrder: 9 },
        { title: 'Trang trí lối đi', description: 'Hàng hoa dọc lối đi lễ cưới', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=800&h=600&fit=crop', likes: 223, sortOrder: 10 },
        { title: 'Backdrop hoa cưới', description: 'Phông nền hoa tươi ấn tượng cho lễ cưới', category: 'wedding', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', likes: 298, sortOrder: 11 },
        { title: 'Hoa tặng Valentine', description: 'Hộp hoa sang trọng cho ngày Valentine', category: 'birthday', imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop', likes: 412, sortOrder: 12 },
        { title: 'Lọ hoa vintage', description: 'Phong cách hoa vintage ấm áp và sang trọng', category: 'decor', imageUrl: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&h=1200&fit=crop', likes: 178, sortOrder: 13 },
        { title: 'Hoa lily trắng', description: 'Lily trắng thanh lịch cho mọi không gian', category: 'decor', imageUrl: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&h=600&fit=crop', likes: 203, sortOrder: 14 },
        { title: 'Hoa tiệc sự kiện', description: 'Trang trí bàn tiệc sự kiện cao cấp', category: 'event', imageUrl: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&h=1000&fit=crop', likes: 198, sortOrder: 15 },
        { title: 'Sinh nhật đặc biệt', description: 'Bó hoa sinh nhật rực rỡ sắc màu', category: 'birthday', imageUrl: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop', likes: 267, sortOrder: 16 },
    ];
    await galleryRepo.save(galleryItems.map(g => galleryRepo.create(g)));
    console.log(`  ✓ ${galleryItems.length} gallery items`);

    console.log('✅ Seeding complete!');
    await app.close();
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
