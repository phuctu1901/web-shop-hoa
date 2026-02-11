import { IsString, IsNumber, IsOptional, Min, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReviewDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @Type(() => Number)
    productId: number;

    @ApiProperty({ example: 'Nguyễn Văn A' })
    @IsString()
    @MaxLength(200)
    reviewerName: string;

    @ApiProperty({ example: 5 })
    @IsNumber()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    rating: number;

    @ApiPropertyOptional({ example: 'Hoa rất đẹp, giao hàng nhanh!' })
    @IsOptional()
    @IsString()
    comment?: string;
}
