import { IsString, IsNumber } from 'class-validator';

export class UpdateBlessingFlipDto {
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