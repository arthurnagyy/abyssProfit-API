import { Injectable } from '@nestjs/common';
import { AppSettingsService } from '../appSettings/appSettings.service';
import { Currency } from 'src/currency/currency.schema';
import { CurrencyService } from 'src/currency/currency.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PoeNinjaService {
    constructor(
        private readonly currencyService: CurrencyService,
        private readonly appSettingsService: AppSettingsService,
        private readonly httpService: HttpService,
    ) { }

    async importCurrencyFromPoeNinja(league: string): Promise<Currency[]> {
        const currencyInformation = await this.requestCurrencyInformationFromPoeNinja(league);
        const currencyList = this.parseCurrencyInformation(currencyInformation.data.lines);

        return this.currencyService.insertMany(currencyList);
    }

    private async requestCurrencyInformationFromPoeNinja(league: string) {
        const appSettings = await this.appSettingsService.findByLeague(league);
        const url = appSettings.poeNinjaCurrencyLink + '?league=' + appSettings.league + '&type=Currency'

        const resp = await lastValueFrom(this.httpService.get(url));

        return resp;
    }

    private parseCurrencyInformation(currencyInformationList): Currency[] {
        let currencyList: Currency[] = [];

        for (let currencyInformation of currencyInformationList) {
            let currency: Currency = {
                name: currencyInformation.currencyTypeName.toLowerCase(),
                chaos: currencyInformation.chaosEquivalent
            };

            currencyList.push(currency);
        }

        return currencyList;
    }
}
