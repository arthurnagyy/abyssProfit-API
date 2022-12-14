import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyModule } from './currency/currency.module';
import { AppSettingsModule } from './appSettings/appSettings.module';
import { PoeNinjaModule } from './poe-ninja/poe-ninja.module';
import { BlessingFlipModule } from './blessing-flip/blessing-flip.module';
import { PriceUpdaterModule } from './price-updater/price-updater.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost:27017/abyssProfit'),
    CurrencyModule,
    AppSettingsModule,
    PoeNinjaModule,
    BlessingFlipModule,
    PriceUpdaterModule
  ],
})
export class AppModule {}
