import { IsString, IsNumber } from 'class-validator';

export class CreateBlessingFlipDto {
    @IsString()
    blessing: string;

    @IsString()
    itemName: string;

    @IsNumber()
    itemPrice: number;

    @IsString()
    resultedItemName: string;

    @IsNumber()
    resultedItemPrice: number;
}