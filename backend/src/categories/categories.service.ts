import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly repo: Repository<Category>,
    ) { }

    findAll(): Promise<Category[]> {
        return this.repo.find({ order: { name: 'ASC' } });
    }

    async findOne(id: number): Promise<Category> {
        const cat = await this.repo.findOne({ where: { id } });
        if (!cat) throw new NotFoundException(`Category #${id} not found`);
        return cat;
    }

    create(dto: CreateCategoryDto): Promise<Category> {
        const cat = this.repo.create(dto);
        return this.repo.save(cat);
    }

    async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
        await this.findOne(id);
        await this.repo.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.findOne(id);
        await this.repo.delete(id);
    }
}
