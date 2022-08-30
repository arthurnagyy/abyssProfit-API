import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppSettingsDocument = AppSettings & Document;

@Schema()
export class AppSettings {
    @Prop()
    league: string;

    @Prop()
    poeNinjaCurrencyLink: string;
}

export const AppSettingsSchema = SchemaFactory.createForClass(AppSettings);