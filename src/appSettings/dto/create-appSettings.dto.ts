import { IsBoolean, IsString, IsNumber } from 'class-validator';

export class CreateAppSettingsDto {
    @IsString()
    league: string;

    @IsString()
    poeNinjaCurrencyLink: string;

    @IsString()
    poeSaleLink: string;

    @IsBoolean()
    importingBlessingFlipPrices: boolean;

    @IsNumber()
    skipsForPrice: number;
}