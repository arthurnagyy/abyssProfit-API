import { Controller, Get, Param } from '@nestjs/common';
import { PriceUpdaterService } from './price-updater.service';


@Controller('price-updater')
export class PriceUpdaterController {
    constructor(
        private readonly priceUpdaterService: PriceUpdaterService
    ) {}

    @Get('/:league/blessing-flip')
    async updateBlessingFlip(
        @Param('league') league: string
    ) {
        this.priceUpdaterService.updateBlessingFlip(league);
    }
}
