import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminUser } from './admin-user.entity';
import { LoginDto, ChangePasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AdminUser)
        private readonly userRepo: Repository<AdminUser>,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepo.findOne({ where: { username: dto.username } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, username: user.username };
        return { access_token: this.jwtService.sign(payload) };
    }

    async changePassword(userId: number, dto: ChangePasswordDto): Promise<{ message: string }> {
        if (dto.newPassword !== dto.confirmPassword) {
            throw new BadRequestException('Mật khẩu xác nhận không khớp');
        }

        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException('User not found');

        const valid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!valid) throw new BadRequestException('Mật khẩu hiện tại không đúng');

        user.passwordHash = await bcrypt.hash(dto.newPassword, 10);
        await this.userRepo.save(user);

        return { message: 'Đổi mật khẩu thành công' };
    }

    async createAdminUser(username: string, password: string): Promise<AdminUser> {
        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, passwordHash: hash });
        return this.userRepo.save(user);
    }
}
