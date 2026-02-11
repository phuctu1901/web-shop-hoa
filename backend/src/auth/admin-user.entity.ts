import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_users')
export class AdminUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    username: string;

    @Column({ name: 'password_hash', length: 255 })
    passwordHash: string;
}
