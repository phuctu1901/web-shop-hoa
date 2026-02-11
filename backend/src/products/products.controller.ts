import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
    constructor(private readonly service: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'List products with optional filters' })
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'sort', required: false, enum: ['price-asc', 'price-desc', 'rating', 'newest'] })
    @ApiQuery({ name: 'search', required: false })
    findAll(
        @Query('category') category?: string,
        @Query('sort') sort?: string,
        @Query('search') search?: string,
    ) {
        return this.service.findAll({ category, sort, search });
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get product by SEO-friendly slug' })
    findBySlug(@Param('slug') slug: string) {
        return this.service.findBySlug(slug);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product detail with images and reviews' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create product (admin)' })
    create(@Body() dto: CreateProductDto) {
        return this.service.create(dto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update product (admin)' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete product (admin)' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
