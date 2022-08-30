import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppSettings, AppSettingsDocument } from './appSettings.schema';
import { CreateAppSettingsDto } from './dto/create-appSettings.dto';
import { UpdateAppSettingsDto } from './dto/update-appSettings.dto';

@Injectable()
export class AppSettingsService {
    constructor(
        @InjectModel(AppSettings.name) private appSettingsModel: Model<AppSettingsDocument>
    ) { }

    async findAll() {
        return this.appSettingsModel.find().exec();
    }

    async findByLeague(league: string) {
        const appSettings = await this.appSettingsModel.findOne({ league });

        if (!appSettings) {
            throw new NotFoundException('AppSettings not found');
        }

        return appSettings;
    }

    async create(createAppSettingsDto: CreateAppSettingsDto): Promise<AppSettings> {
        const createdAppSettings = new this.appSettingsModel(createAppSettingsDto);

        return createdAppSettings.save();
    }

    async update(id: string, updateAppSettingsDto: UpdateAppSettingsDto): Promise<AppSettings> {
        const appSettings = await this.appSettingsModel.findByIdAndUpdate(id, updateAppSettingsDto, { new: true });

        if (!appSettings) {
            throw new NotFoundException('AppSettings not found');
        }

        return appSettings;
    }

    async delete(id: string): Promise<void> {
        return this.appSettingsModel.findByIdAndDelete(id);
    }
}
