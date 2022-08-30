import { IsString } from 'class-validator';

export class UpdateAppSettingsDto {
    @IsString()
    league: string;

    @IsString()
    poeNinjaCurrencyLink: string;
}