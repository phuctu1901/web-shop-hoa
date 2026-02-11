import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product-image.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(ProductImage)
        private readonly imageRepo: Repository<ProductImage>,
    ) { }

    /** Generate URL-friendly slug from Vietnamese text */
    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 200);
    }

    /** Ensure slug is unique by appending a number if necessary */
    private async ensureUniqueSlug(slug: string, excludeId?: number): Promise<string> {
        let candidate = slug;
        let counter = 1;
        while (true) {
            const existing = await this.productRepo.findOne({ where: { slug: candidate } });
            if (!existing || existing.id === excludeId) return candidate;
            candidate = `${slug}-${counter++}`;
        }
    }

    async findAll(query: { category?: string; sort?: string; search?: string }): Promise<Product[]> {
        const qb = this.productRepo
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.images', 'img')
            .leftJoinAndSelect('p.category', 'cat');

        if (query.category && query.category !== 'all') {
            qb.andWhere('cat.slug = :slug', { slug: query.category });
        }

        if (query.search) {
            qb.andWhere('(p.name LIKE :q OR p.shortDescription LIKE :q)', { q: `%${query.search}%` });
        }

        switch (query.sort) {
            case 'price-asc':
                qb.orderBy('p.price', 'ASC');
                break;
            case 'price-desc':
                qb.orderBy('p.price', 'DESC');
                break;
            case 'rating':
                qb.orderBy('p.rating', 'DESC');
                break;
            case 'newest':
                qb.orderBy('p.createdAt', 'DESC');
                break;
            default:
                qb.orderBy('p.id', 'ASC');
        }

        qb.addOrderBy('img.sortOrder', 'ASC');

        return qb.getMany();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: ['images', 'category', 'reviews'],
        });
        if (!product) throw new NotFoundException(`Product #${id} not found`);
        return product;
    }

    async findBySlug(slug: string): Promise<Product> {
        const product = await this.productRepo.findOne({
            where: { slug },
            relations: ['images', 'category', 'reviews'],
        });
        if (!product) throw new NotFoundException(`Product with slug "${slug}" not found`);
        return product;
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const { imageUrls, imageAlts, ...data } = dto;

        // Auto-generate slug if not provided
        if (!data.slug) {
            data.slug = this.generateSlug(data.name);
        }
        data.slug = await this.ensureUniqueSlug(data.slug);

        const product = this.productRepo.create(data);
        const saved = await this.productRepo.save(product);

        if (imageUrls?.length) {
            const images = imageUrls.map((url, i) =>
                this.imageRepo.create({
                    productId: saved.id,
                    url,
                    altText: imageAlts?.[i] || data.name,
                    sortOrder: i,
                }),
            );
            await this.imageRepo.save(images);
        }

        return this.findOne(saved.id);
    }

    async update(id: number, dto: UpdateProductDto): Promise<Product> {
        const existing = await this.findOne(id);
        const { imageUrls, imageAlts, ...data } = dto;

        // Auto-regenerate slug if name changed and no explicit slug provided
        if (data.name && !data.slug) {
            data.slug = this.generateSlug(data.name);
            data.slug = await this.ensureUniqueSlug(data.slug, id);
        } else if (data.slug) {
            data.slug = await this.ensureUniqueSlug(data.slug, id);
        }

        if (Object.keys(data).length > 0) {
            await this.productRepo.update(id, data);
        }

        if (imageUrls !== undefined) {
            await this.imageRepo.delete({ productId: id });
            if (imageUrls.length) {
                const images = imageUrls.map((url, i) =>
                    this.imageRepo.create({
                        productId: id,
                        url,
                        altText: imageAlts?.[i] || existing.name,
                        sortOrder: i,
                    }),
                );
                await this.imageRepo.save(images);
            }
        }

        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.productRepo.delete(id);
    }
}
