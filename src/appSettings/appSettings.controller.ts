import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { ValidationPipe } from '../validation.pipe';
import { ValidateMongoId } from '../validateMongoId.pipe';
import { AppSettingsService } from './appSettings.service';
import { AppSettings } from './appSettings.schema';
import { CreateAppSettingsDto } from './dto/create-appSettings.dto';
import { UpdateAppSettingsDto } from './dto/update-appSettings.dto';

@Controller('appSettings')
export class AppSettingsController {
    constructor(private readonly appSettingsService: AppSettingsService) { }

    @Get()
    async getAppSettings() {
        return await this.appSettingsService.findAll();
    }

    @Get('/:league')
    async getAppSettingsByLeague(
        @Param('league') league: string
    ) {
        return await this.appSettingsService.findByLeague(league);
    }

    @Post('/create')
    async createAppSettings(@Body(new ValidationPipe()) createAppSettingsDto: CreateAppSettingsDto): Promise<AppSettings> {
        return await this.appSettingsService.create(createAppSettingsDto);
    }

    @Patch('/:id')
    async updateAppSettings(
        @Param('id', ValidateMongoId) id: string,
        @Body(new ValidationPipe()) updateAppSettings: UpdateAppSettingsDto
    ): Promise<AppSettings> {
        return await this.appSettingsService.update(id, updateAppSettings);
    }

    @Delete('/:id')
    async deleteAppSettings(
        @Param('id', ValidateMongoId) id: string,
    ): Promise<void> {
        return await this.appSettingsService.delete(id);
    }
}
