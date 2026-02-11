import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsUrl } from 'class-validator';

export class CreateGalleryItemDto {
    @ApiProperty({ example: 'Hoa cưới cổ điển' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Bó hoa hồng trắng tinh khôi cho ngày trọng đại', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'wedding', description: 'Category slug: wedding, birthday, event, bouquet, decor' })
    @IsString()
    category: string;

    @ApiProperty({ example: 'https://images.unsplash.com/photo-xxx?w=800' })
    @IsString()
    imageUrl: string;

    @ApiProperty({ example: 0, required: false })
    @IsOptional()
    @IsNumber()
    likes?: number;

    @ApiProperty({ example: 0, required: false })
    @IsOptional()
    @IsNumber()
    sortOrder?: number;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateGalleryItemDto extends PartialType(CreateGalleryItemDto) { }
