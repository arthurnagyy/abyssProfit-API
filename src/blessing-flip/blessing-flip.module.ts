import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlessingFlipController } from './blessing-flip.controller';
import { BlessingFlipService } from './blessing-flip.service';
import { BlessingFlip, BlessingFlipSchema } from './blessing-flip.schema';
import { CurrencyModule } from 'src/currency/currency.module';
import { BlessingFlipDefaultData } from './blessing-flip.default-data';

@Module({
    imports: [
        CurrencyModule,
        MongooseModule.forFeature([{ name: BlessingFlip.name, schema: BlessingFlipSchema }]),
    ],
    controllers: [BlessingFlipController],
    providers: [BlessingFlipService, BlessingFlipDefaultData],
    exports: [BlessingFlipService],
})
export class BlessingFlipModule { }
