import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { ProductImage } from './product-image.entity';
import { Review } from '../reviews/review.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true, nullable: true })
    slug: string;

    @Column({ name: 'category_id', nullable: true })
    categoryId: number;

    @ManyToOne(() => Category, (cat) => cat.products, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ name: 'short_description', length: 500, nullable: true })
    shortDescription: string;

    @Column({ name: 'long_description', type: 'text', nullable: true })
    longDescription: string;

    @Column({ type: 'decimal', precision: 12, scale: 0 })
    price: number;

    @Column({ name: 'original_price', type: 'decimal', precision: 12, scale: 0, nullable: true })
    originalPrice: number;

    @Column({ length: 100, nullable: true })
    badge: string;

    @Column({ type: 'float', default: 0 })
    rating: number;

    @Column({ name: 'review_count', default: 0 })
    reviewCount: number;

    @Column({ type: 'json', nullable: true })
    features: string[];

    @Column({ type: 'json', nullable: true })
    specifications: Record<string, string>;

    @Column({ name: 'care_instructions', type: 'json', nullable: true })
    careInstructions: string[];

    @Column({ type: 'json', nullable: true })
    occasions: string[];

    // SEO metadata
    @Column({ name: 'meta_title', length: 255, nullable: true })
    metaTitle: string;

    @Column({ name: 'meta_description', type: 'text', nullable: true })
    metaDescription: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @OneToMany(() => ProductImage, (img) => img.product, { cascade: true, eager: true })
    images: ProductImage[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];
}
