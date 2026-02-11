import { Controller, Get, Post, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Reviews')
@Controller('api/reviews')
export class ReviewsController {
    constructor(private readonly service: ReviewsService) { }

    @Get()
    @ApiOperation({ summary: 'List reviews for a product' })
    @ApiQuery({ name: 'productId', required: true })
    findByProduct(@Query('productId', ParseIntPipe) productId: number) {
        return this.service.findByProduct(productId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a review' })
    create(@Body() dto: CreateReviewDto) {
        return this.service.create(dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete review (admin)' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
