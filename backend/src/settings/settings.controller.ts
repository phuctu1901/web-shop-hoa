import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { BulkUpdateSettingsDto } from './setting.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Settings')
@Controller('api/settings')
export class SettingsController {
    constructor(private readonly service: SettingsService) { }

    @Get()
    @ApiOperation({ summary: 'Get all site settings (public)' })
    findAll() {
        return this.service.findAll();
    }

    @Get('raw')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all settings with metadata (admin)' })
    findAllRaw() {
        return this.service.findAllRaw();
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Bulk update settings (admin)' })
    bulkUpdate(@Body() dto: BulkUpdateSettingsDto) {
        return this.service.bulkUpdate(dto.settings);
    }
}
