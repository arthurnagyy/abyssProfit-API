import { IsString, IsNumber } from 'class-validator';

export class CreateCurrencyDto {
    @IsString()
    name: string;

    @IsNumber()
    chaos: number;
}