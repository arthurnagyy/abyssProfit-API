import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BlessingFlipModule } from '../blessing-flip/blessing-flip.module';
import { AppSettingsModule } from '../appSettings/appSettings.module';
import { PriceUpdaterController } from './price-updater.controller';
import { PriceUpdaterService } from './price-updater.service';

@Module({
  imports: [HttpModule, BlessingFlipModule, AppSettingsModule],
  controllers: [PriceUpdaterController],
  providers: [PriceUpdaterService]
})
export class PriceUpdaterModule { }
