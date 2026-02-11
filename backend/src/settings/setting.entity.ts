import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSetting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 100 })
    key: string;

    @Column({ type: 'text' })
    value: string;

    @Column({ length: 100, nullable: true })
    label: string;

    @Column({ length: 50, default: 'text' })
    type: string; // text, textarea, url, image

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
