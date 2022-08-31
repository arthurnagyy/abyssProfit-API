import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlessingFlipController } from './blessing-flip.controller';
import { BlessingFlipService } from './blessing-flip.service';
import { BlessingFlip, BlessingFlipSchema } from './blessing-flip.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: BlessingFlip.name, schema: BlessingFlipSchema }])],
    controllers: [BlessingFlipController],
    providers: [BlessingFlipService]
})
export class BlessingFlipModule { }
