import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'admin' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'admin123' })
    @IsString()
    password: string;
}

export class ChangePasswordDto {
    @ApiProperty({ example: 'admin123' })
    @IsString()
    currentPassword: string;

    @ApiProperty({ example: 'newpassword456' })
    @IsString()
    @MinLength(6)
    newPassword: string;

    @ApiProperty({ example: 'newpassword456' })
    @IsString()
    confirmPassword: string;
}
