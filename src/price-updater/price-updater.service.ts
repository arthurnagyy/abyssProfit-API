import { Injectable, NotFoundException } from '@nestjs/common';
import { BlessingFlipService } from '../blessing-flip/blessing-flip.service';
import { AppSettingsService } from '../appSettings/appSettings.service';
import { CurrencyService } from '../currency/currency.service';
import { BlessingFlip } from '../blessing-flip/blessing-flip.schema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { exit } from 'process';

@Injectable()
export class PriceUpdaterService {
    constructor(
        private readonly appSettingsService: AppSettingsService,
        private readonly blessingFlipService: BlessingFlipService,
        private readonly currencyService: CurrencyService,
        private readonly httpService: HttpService
    ) { }

    private league: string;
    private itemCounter: number = 0;

    async updateBlessingFlip(league: string) {
        this.league = league;
        const blessingFlipList = await this.blessingFlipService.findAll();

        console.log("Blessing Flip Prices Updating");

        for (let blessingFlip of blessingFlipList) {

            blessingFlip.itemPrice = await this.getPriceForItemName(blessingFlip.itemName);

            await this.delay(10000);

            blessingFlip.resultedItemPrice = await this.getPriceForItemName(blessingFlip.resultedItemName);

            await this.delay(10000);


            await this.blessingFlipService.update(blessingFlip._id, blessingFlip);

            this.itemCounter++;
            console.log(this.itemCounter + '/' + blessingFlipList.length);
        }

        this.itemCounter = 0;
        console.log("BlessingFlip Prices Updated");
    }

    private async getPriceForItemName(itemName: string): Promise<number> {
        const [itemListingIds, queryId] = await this.getItemListings(itemName);

        await this.delay(10000);

        if (itemListingIds.length < 1) {
            throw new NotFoundException('No item listings found for ' + itemName);
        }

        const itemsListed = await this.getItemPrices(itemListingIds, queryId);

        return await this.calculatePriceAverageFromListedItems(itemsListed);
    }

    private async getItemListings(itemName: string): Promise<[string[], string]> {
        const appSettings = await this.appSettingsService.findByLeague(this.league);
        const poeTradeLink = appSettings.poeSaleLink + 'search/' + appSettings.league;
        const poeTradeHeader = {
            'User-Agent': 'AbyssProfit (arthur.nagyy@gmail.com)',
        };
        const poeTradeBody = {
            "query": {
                "status": {
                    "option": "online"
                },
                "name": itemName,
                "stats": [{
                    "type": "and",
                    "filters": []
                }]
            },
            "sort": {
                "price": "asc"
            }
        }

        let response;

        try {
            response = await lastValueFrom(this.httpService.post(
                poeTradeLink,
                poeTradeBody,
                { headers: poeTradeHeader }
            ).pipe(
                map((response) => {
                    return response.data;
                }),
            ));
        } catch (err) {
            console.error(err);
            exit();
        }

        let listingIds = response.result;

        if(response.total >= 15) {
            listingIds.splice(0, appSettings.skipsForPrice);
            listingIds = listingIds.splice(0, 10);
        } else if (response.total >= 10 && response.total <= 15) {
            listingIds.splice(0, 5);
        }

        return [listingIds, response.id];
    }

    private async getItemPrices(listingIds: string[], queryId: string) {
        const appSettings = await this.appSettingsService.findByLeague(this.league);
        const formattedListingIds = listingIds.join(',');
        const poeTradeLink = appSettings.poeSaleLink + 'fetch/' + formattedListingIds + '?query=' + queryId;
        const poeTradeHeader = {
            'User-Agent': 'AbyssProfit (arthur.nagyy@gmail.com)',
        };

        let response;
        try {
            response = await lastValueFrom(this.httpService.get(poeTradeLink, { headers: poeTradeHeader }));
        } catch (err)
        {
            console.error(err);
            exit();
        }

        return response.data.result;
    }

    private async calculatePriceAverageFromListedItems(listedItems): Promise<number> {
        let averagePrice = 0;

        for (const listedItem of listedItems) {
            const currencyType: string = listedItem.listing.price.currency;
            const currencyAmount: number = listedItem.listing.price.amount;
            averagePrice += currencyType.toLowerCase() == "chaos" ? currencyAmount : await this.convertCurrencyToChaos(currencyType, currencyAmount);
        }

        return Math.ceil(averagePrice / listedItems.length);
    }

    private async convertCurrencyToChaos(currencyName: string, currencyAmount: number): Promise<number> {
        const currency = await this.currencyService.findOneByNameLike(currencyName.toLowerCase());

        return currencyAmount * currency.chaos;
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
