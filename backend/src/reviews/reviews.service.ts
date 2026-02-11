import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Product } from '../products/product.entity';
import { CreateReviewDto } from './review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepo: Repository<Review>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) { }

    async findByProduct(productId: number): Promise<Review[]> {
        return this.reviewRepo.find({
            where: { productId },
            order: { reviewDate: 'DESC' },
        });
    }

    async create(dto: CreateReviewDto): Promise<Review> {
        const product = await this.productRepo.findOne({ where: { id: dto.productId } });
        if (!product) throw new NotFoundException(`Product #${dto.productId} not found`);

        const review = this.reviewRepo.create(dto);
        const saved = await this.reviewRepo.save(review);

        // Update product rating & review count
        const stats = await this.reviewRepo
            .createQueryBuilder('r')
            .select('AVG(r.rating)', 'avg')
            .addSelect('COUNT(*)', 'count')
            .where('r.product_id = :pid', { pid: dto.productId })
            .getRawOne();

        await this.productRepo.update(dto.productId, {
            rating: parseFloat(stats.avg) || 0,
            reviewCount: parseInt(stats.count) || 0,
        });

        return saved;
    }

    async remove(id: number): Promise<void> {
        const review = await this.reviewRepo.findOne({ where: { id } });
        if (!review) throw new NotFoundException(`Review #${id} not found`);

        await this.reviewRepo.delete(id);

        // Re-calculate product rating
        const stats = await this.reviewRepo
            .createQueryBuilder('r')
            .select('AVG(r.rating)', 'avg')
            .addSelect('COUNT(*)', 'count')
            .where('r.product_id = :pid', { pid: review.productId })
            .getRawOne();

        await this.productRepo.update(review.productId, {
            rating: parseFloat(stats.avg) || 0,
            reviewCount: parseInt(stats.count) || 0,
        });
    }
}
