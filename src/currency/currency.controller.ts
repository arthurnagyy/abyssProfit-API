import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { ValidateMongoId } from '../validateMongoId.pipe';
import { ValidationPipe } from '../validation.pipe';
import { Currency } from './currency.schema';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('currency')
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) { }

	@Get()
	async getAllCurrencies(): Promise<Currency[]> {
		return await this.currencyService.findAll();
	}

	@Get('/:id')
	async getCurrency(
		@Param('id', ValidateMongoId) id: string,
	): Promise<Currency> {
		return await this.currencyService.findOne(id);
	}

	@Get('/name/:name')
	async getCurrencyByName(@Param('name') name: string): Promise<Currency> {
		return await this.currencyService.findOneByName(name);
	}

	@Post('/create')
	async createCurrency(@Body(new ValidationPipe()) createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
		return await this.currencyService.create(createCurrencyDto);
	}

	@Delete('/:id')
	async deleteCurrency(
		@Param('id', ValidateMongoId) id: string,
	): Promise<void> {
		return await this.currencyService.delete(id);
	}

	@Patch('/:id')
	async updateCurrency(
		@Param('id', ValidateMongoId) id: string,
		@Body(new ValidationPipe()) updateCurrencyDto: UpdateCurrencyDto
	): Promise<Currency> {
		return await this.currencyService.update(id, updateCurrencyDto);
	}
}
