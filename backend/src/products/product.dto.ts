import { IsString, IsNumber, IsOptional, IsArray, MaxLength, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @ApiProperty({ example: 'Bó hoa cưới Romantic' })
    @IsString()
    @MaxLength(255)
    name: string;

    @ApiPropertyOptional({ example: 'bo-hoa-cuoi-romantic' })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @Type(() => Number)
    categoryId: number;

    @ApiPropertyOptional({ example: 'Hoa hồng trắng và baby breath tinh tế' })
    @IsOptional()
    @IsString()
    shortDescription?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    longDescription?: string;

    @ApiProperty({ example: 1200000 })
    @IsNumber()
    @Type(() => Number)
    price: number;

    @ApiPropertyOptional({ example: 1500000 })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    originalPrice?: number;

    @ApiPropertyOptional({ example: 'Bán chạy' })
    @IsOptional()
    @IsString()
    badge?: string;

    @ApiPropertyOptional({ example: ['25 hoa hồng trắng Ecuador'] })
    @IsOptional()
    @IsArray()
    features?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    specifications?: Record<string, string>;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    careInstructions?: string[];

    @ApiPropertyOptional({ example: ['Đám cưới'] })
    @IsOptional()
    @IsArray()
    occasions?: string[];

    @ApiPropertyOptional({ example: ['/uploads/image1.webp'] })
    @IsOptional()
    @IsArray()
    imageUrls?: string[];

    @ApiPropertyOptional({ example: ['Bó hoa cưới Romantic'] })
    @IsOptional()
    @IsArray()
    imageAlts?: string[];

    // SEO
    @ApiPropertyOptional({ example: 'Bó hoa cưới Romantic - BloomStore' })
    @IsOptional()
    @IsString()
    metaTitle?: string;

    @ApiPropertyOptional({ example: 'Bó hoa cưới Romantic với hoa hồng trắng Ecuador tinh tế' })
    @IsOptional()
    @IsString()
    metaDescription?: string;
}

export class UpdateProductDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    categoryId?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    shortDescription?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    longDescription?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    price?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    originalPrice?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    badge?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    features?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    specifications?: Record<string, string>;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    careInstructions?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    occasions?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    imageUrls?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    imageAlts?: string[];

    // SEO
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    metaTitle?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    metaDescription?: string;
}
