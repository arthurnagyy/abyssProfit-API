import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettingsController } from './appSettings.controller';
import { AppSettingsService } from './appSettings.service';
import { AppSettings, AppSettingsSchema } from './appSettings.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: AppSettings.name, schema: AppSettingsSchema}]),
    ],
    controllers: [AppSettingsController],
    providers: [AppSettingsService],
    exports: [ MongooseModule, AppSettingsService ]
})

export class AppSettingsModule {}