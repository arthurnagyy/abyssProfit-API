import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ValidateMongoId } from '../validateMongoId.pipe';
import { ValidationPipe } from '../validation.pipe';
import { BlessingFlip } from './blessing-flip.schema';
import { BlessingFlipService } from './blessing-flip.service';
import { BlessingFlipDefaultData } from './blessing-flip.default-data';
import { CreateBlessingFlipDto } from './dto/create-blessing-flip.dto';

@Controller('blessing-flip')
export class BlessingFlipController {
    constructor(
        private readonly blessingFlipService: BlessingFlipService,
        private readonly blessingFlipDefaultData: BlessingFlipDefaultData
    ) { }

    @Get()
    async getAllBlessingFlips(): Promise<BlessingFlip[]> {
        return await this.blessingFlipService.findAll();
    }

    @Get('/:id')
    async getBlessingFlip(
        @Param('id', ValidateMongoId) id: string,
    ): Promise<BlessingFlip> {
        return await this.blessingFlipService.findOne(id);
    }

    @Post('/create')
    async createBlessingFlip(
        @Body(new ValidationPipe()) createBlessingFlipDto: CreateBlessingFlipDto
    ): Promise<BlessingFlip> {
        return await this.blessingFlipService.create(createBlessingFlipDto);
    }

    @Delete('/:id')
    async deleteBlessingFlip(
        @Param('id', ValidateMongoId) id: string
    ): Promise<void> {
        return this.blessingFlipService.delete(id);
    }

    @Get('/import/default')
    async importDefaultData() {
        return await this.blessingFlipDefaultData.generateData();
    }
}
