import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryItem } from './gallery-item.entity';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './gallery-item.dto';

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(GalleryItem)
        private readonly repo: Repository<GalleryItem>,
    ) { }

    /** List gallery items with optional category filter */
    async findAll(query: { category?: string }): Promise<GalleryItem[]> {
        const qb = this.repo.createQueryBuilder('g')
            .where('g.is_active = :active', { active: true });

        if (query.category && query.category !== 'all') {
            qb.andWhere('g.category = :cat', { cat: query.category });
        }

        qb.orderBy('g.sort_order', 'ASC')
            .addOrderBy('g.id', 'ASC');

        return qb.getMany();
    }

    /** Get available categories with counts */
    async getCategories(): Promise<{ category: string; count: number }[]> {
        return this.repo
            .createQueryBuilder('g')
            .select('g.category', 'category')
            .addSelect('COUNT(*)', 'count')
            .where('g.is_active = :active', { active: true })
            .groupBy('g.category')
            .orderBy('count', 'DESC')
            .getRawMany();
    }

    async findOne(id: number): Promise<GalleryItem> {
        const item = await this.repo.findOne({ where: { id } });
        if (!item) throw new NotFoundException(`Gallery item #${id} not found`);
        return item;
    }

    async create(dto: CreateGalleryItemDto): Promise<GalleryItem> {
        const item = this.repo.create(dto);
        return this.repo.save(item);
    }

    async createBulk(dtos: CreateGalleryItemDto[]): Promise<GalleryItem[]> {
        const items = this.repo.create(dtos);
        return this.repo.save(items);
    }

    async update(id: number, dto: UpdateGalleryItemDto): Promise<GalleryItem> {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.repo.delete(id);
    }

    /** Increment likes for a gallery item */
    async like(id: number): Promise<GalleryItem> {
        await this.findOne(id);
        await this.repo.increment({ id }, 'likes', 1);
        return this.findOne(id);
    }
}
