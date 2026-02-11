import { Controller, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ChangePasswordDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Admin login — returns JWT token' })
    login(@Body() dto: LoginDto) {
        return this.service.login(dto);
    }

    @Put('change-password')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change admin password' })
    changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
        return this.service.changePassword(req.user.sub || req.user.userId, dto);
    }
}
