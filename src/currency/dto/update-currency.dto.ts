import { IsString, IsNumber } from 'class-validator';

export class UpdateCurrencyDto {
    @IsString()
    name: string;

    @IsNumber()
    chaos: number;
}