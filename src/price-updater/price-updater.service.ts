import { Injectable } from '@nestjs/common';
import { BlessingFlipService } from '../blessing-flip/blessing-flip.service';
import { AppSettingsService } from '../appSettings/appSettings.service';
import { BlessingFlip } from '../blessing-flip/blessing-flip.schema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { exit } from 'process';

@Injectable()
export class PriceUpdaterService {
    constructor(
        private readonly appSettingsService: AppSettingsService,
        private readonly blessingFlipService: BlessingFlipService,
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

            await this.delay(2000);

            blessingFlip.resultedItemPrice = await this.getPriceForItemName(blessingFlip.resultedItemName);

            await this.delay(2000);


            await this.blessingFlipService.update(blessingFlip._id, blessingFlip);

            this.itemCounter++;
            console.log(this.itemCounter + blessingFlipList.length + "/");

            throw new Error('ok man');
        }

        this.itemCounter = 0;
        console.log("BlessingFlip Prices Updated");
    }

    private async getPriceForItemName(itemName: string): Promise<number> {
        const appSettings = await this.appSettingsService.findByLeague(this.league);
        const poeTradeLink = appSettings.poeSaleLink + appSettings.league;
        const poeTradeHeader = {
            'Host': 'AbyssProfit (arthur.nagyy@gmail.com)'
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

        try {
            const response = await lastValueFrom(this.httpService.post(
                poeTradeLink,
                poeTradeBody,
                { headers: poeTradeHeader }
            ).pipe(
                map((response) => {
                    return response.data;
                }),
            ));

            console.log(response);
        } catch (err) {
            console.error(err);
        }

        exit();

        return 1;
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
