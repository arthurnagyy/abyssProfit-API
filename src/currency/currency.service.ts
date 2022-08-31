import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Currency, CurrencyDocument } from './currency.schema';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(
        @InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>,
    ) { }

    async findAll(): Promise<Currency[]> {
        return this.currencyModel.find().exec();
    }

    async findOne(id: string): Promise<Currency> {
        const currency = await this.currencyModel.findOne({ _id: id });

        if (!currency) {
            throw new NotFoundException('Currency not found');
        }

        return currency;
    }

    async findOneByName(name: string): Promise<Currency> {
        const currency = await this.currencyModel.findOne({ name });

        if (!currency) {
            throw new NotFoundException('Currency not found');
        }

        return currency;
    }

    async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
        const createdCurrency = new this.currencyModel(createCurrencyDto);

        return createdCurrency.save();
    }

    async insertMany(currencyList: Currency[]): Promise<Currency[]> {
        return await this.currencyModel.insertMany(currencyList);
    }

    async update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency> {
        const currency = await this.currencyModel.findByIdAndUpdate(id, updateCurrencyDto, { new: true });

        if (!currency) {
            throw new NotFoundException('Currency not found');
        }

        return currency;
    }

    async updateMany(currencyList: Currency[]): Promise<Currency[]> {
        let updatedCurrencies: Currency[] = [];

        for (let currency of currencyList) {
            updatedCurrencies.push(await this.currencyModel.findOneAndUpdate({ name: currency.name }, currency));
        }

        return updatedCurrencies;
    }

    async delete(id: string): Promise<void> {
        return this.currencyModel.findByIdAndDelete(id);
    }
}
