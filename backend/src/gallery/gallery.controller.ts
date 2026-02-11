import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto, UpdateGalleryItemDto } from './gallery-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Gallery')
@Controller('api/gallery')
export class GalleryController {
    constructor(private readonly service: GalleryService) { }

    @Get()
    @ApiOperation({ summary: 'List gallery items with optional category filter' })
    @ApiQuery({ name: 'category', required: false })
    findAll(@Query('category') category?: string) {
        return this.service.findAll({ category });
    }

    @Get('categories')
    @ApiOperation({ summary: 'Get gallery categories with item counts' })
    getCategories() {
        return this.service.getCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single gallery item' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create gallery item (admin)' })
    create(@Body() dto: CreateGalleryItemDto) {
        return this.service.create(dto);
    }

    @Post('bulk')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Bulk create gallery items (admin)' })
    createBulk(@Body() dtos: CreateGalleryItemDto[]) {
        return this.service.createBulk(dtos);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update gallery item (admin)' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGalleryItemDto) {
        return this.service.update(id, dto);
    }

    @Post(':id/like')
    @ApiOperation({ summary: 'Like a gallery item (public)' })
    like(@Param('id', ParseIntPipe) id: number) {
        return this.service.like(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete gallery item (admin)' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
