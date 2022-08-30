import { IsString } from 'class-validator';

export class CreateAppSettingsDto {
    @IsString()
    league: string;

    @IsString()
    poeNinjaCurrencyLink: string;
}