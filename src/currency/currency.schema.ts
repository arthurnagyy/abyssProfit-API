import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema()
export class Currency {
    @Prop({
        unique: true
    })
    name: string;

    @Prop()
    chaos: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);