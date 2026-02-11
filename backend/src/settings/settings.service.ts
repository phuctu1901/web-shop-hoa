import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSetting } from './setting.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(SiteSetting)
        private readonly repo: Repository<SiteSetting>,
    ) { }

    async findAll(): Promise<Record<string, string>> {
        const settings = await this.repo.find();
        const result: Record<string, string> = {};
        for (const s of settings) {
            result[s.key] = s.value;
        }
        return result;
    }

    async findAllRaw(): Promise<SiteSetting[]> {
        return this.repo.find({ order: { id: 'ASC' } });
    }

    async get(key: string): Promise<string | null> {
        const setting = await this.repo.findOne({ where: { key } });
        return setting?.value ?? null;
    }

    async set(key: string, value: string): Promise<SiteSetting> {
        let setting = await this.repo.findOne({ where: { key } });
        if (setting) {
            setting.value = value;
        } else {
            setting = this.repo.create({ key, value });
        }
        return this.repo.save(setting);
    }

    async bulkUpdate(updates: { key: string; value: string }[]): Promise<Record<string, string>> {
        for (const { key, value } of updates) {
            await this.set(key, value);
        }
        return this.findAll();
    }

    async seedDefaults(defaults: { key: string; value: string; label: string; type: string }[]) {
        for (const d of defaults) {
            const existing = await this.repo.findOne({ where: { key: d.key } });
            if (!existing) {
                await this.repo.save(this.repo.create(d));
            }
        }
    }
}
