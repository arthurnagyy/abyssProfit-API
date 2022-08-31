import { Controller, Get, Param } from '@nestjs/common';
import { PoeNinjaService } from './poe-ninja.service';

@Controller('poe-ninja')
export class PoeNinjaController {
    constructor(private readonly poeNinjaService: PoeNinjaService) {}

    @Get('/importCurrency/:league')
    async importCurrencyFromPoeNinja(
        @Param('league') league: string
    ) {
        return this.poeNinjaService.importCurrencyFromPoeNinja(league);
    }

    @Get('/updateCurrency/:league')
    async updateCurrencyFromPoeNinja(
        @Param('league') league: string
    ) {
        return this.poeNinjaService.updateCurrencyFromPoeNinja(league);
    }
}
