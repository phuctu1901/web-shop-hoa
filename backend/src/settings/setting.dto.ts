import { IsString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateSettingDto {
    @ApiProperty({ example: 'BloomStore' })
    @IsString()
    value: string;
}

export class SettingItemDto {
    @ApiProperty({ example: 'shop_name' })
    @IsString()
    key: string;

    @ApiProperty({ example: 'BloomStore' })
    @IsString()
    value: string;
}

export class BulkUpdateSettingsDto {
    @ApiProperty({
        type: [SettingItemDto],
        example: [
            { key: 'shop_name', value: 'BloomStore' },
            { key: 'slogan', value: 'Premium Flowers' },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SettingItemDto)
    settings: SettingItemDto[];
}
