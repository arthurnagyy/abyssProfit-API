import { Module } from '@nestjs/common';
import { PoeNinjaController } from './poe-ninja.controller';
import { PoeNinjaService } from './poe-ninja.service';
import { HttpModule } from '@nestjs/axios';
import { CurrencyModule } from 'src/currency/currency.module';
import { AppSettingsModule } from 'src/appSettings/appSettings.module';

@Module({
  imports: [HttpModule, AppSettingsModule, CurrencyModule],
  controllers: [PoeNinjaController],
  providers: [PoeNinjaService]
})
export class PoeNinjaModule { }
