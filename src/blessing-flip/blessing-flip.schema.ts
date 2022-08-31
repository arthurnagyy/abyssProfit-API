import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlessingFlipDocument = BlessingFlip & Document;

@Schema()
export class BlessingFlip {
    @Prop()
    blessing: string;

    @Prop()
    itemName: string;

    @Prop()
    itemPrice: number;

    @Prop()
    resultedItemName: string;

    @Prop()
    resultedItemPrice: number;
}

export const BlessingFlipSchema = SchemaFactory.createForClass(BlessingFlip);