import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlessingFlip, BlessingFlipDocument } from './blessing-flip.schema';
import { CreateBlessingFlipDto } from './dto/create-blessing-flip.dto';

@Injectable()
export class BlessingFlipService {
    constructor(
        @InjectModel(BlessingFlip.name) private blessingFlipModel: Model<BlessingFlipDocument>
    ) { }

    async findAll(): Promise<BlessingFlip[]> {
        return this.blessingFlipModel.find().exec();
    }

    async findOne(id: string): Promise<BlessingFlip> {
        const blessingFlip = await this.blessingFlipModel.findOne({ _id: id });

        if (!blessingFlip) {
            throw new NotFoundException('BlessingFlip not found');
        }

        return blessingFlip;
    }

    async create(blessingFlipDto: CreateBlessingFlipDto): Promise<BlessingFlip> {
        const createdBlessingFlip = new this.blessingFlipModel(blessingFlipDto);

        return createdBlessingFlip;
    }

    async delete(id: string): Promise<void> {
        return this.blessingFlipModel.findByIdAndDelete(id);
    }
}
