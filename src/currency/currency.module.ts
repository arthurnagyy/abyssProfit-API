import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { Currency, CurrencySchema } from './currency.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Currency.name, schema: CurrencySchema }])],
    controllers: [CurrencyController],
    providers: [CurrencyService],
    exports: [MongooseModule, CurrencyService],
})

export class CurrencyModule { }