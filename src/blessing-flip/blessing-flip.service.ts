import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlessingFlip, BlessingFlipDocument } from './blessing-flip.schema';
import { CreateBlessingFlipDto } from './dto/create-blessing-flip.dto';
import { UpdateBlessingFlipDto } from './dto/update-blessing-flip.dto';

@Injectable()
export class BlessingFlipService {
    constructor(
        @InjectModel(BlessingFlip.name) private blessingFlipModel: Model<BlessingFlipDocument>
    ) { }

    async findAll(): Promise<BlessingFlipDocument[]> {
        return this.blessingFlipModel.find().exec();
    }

    async findOne(id: string): Promise<BlessingFlipDocument> {
        const blessingFlip = await this.blessingFlipModel.findOne({ _id: id });

        if (!blessingFlip) {
            throw new NotFoundException('BlessingFlip not found');
        }

        return blessingFlip;
    }

    async create(blessingFlipDto: CreateBlessingFlipDto): Promise<BlessingFlipDocument> {
        const createdBlessingFlip = new this.blessingFlipModel(blessingFlipDto);

        return createdBlessingFlip.save();
    }

    async update(id: string, blessingFlipDto: UpdateBlessingFlipDto): Promise<BlessingFlipDocument> {
        const blessingFlip = await this.blessingFlipModel.findByIdAndUpdate(id, blessingFlipDto, { new: true });

        if (!blessingFlip) {
            throw new NotFoundException('BlessingFlip not found');
        }

        return blessingFlip;
    }

    async delete(id: string): Promise<void> {
        return this.blessingFlipModel.findByIdAndDelete(id);
    }

    async insertMany(blessingFlipList: BlessingFlip[]): Promise<BlessingFlipDocument[]> {
        return await this.blessingFlipModel.insertMany(blessingFlipList);
    }
}
