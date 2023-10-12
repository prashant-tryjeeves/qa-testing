import { Injectable, OnModuleInit } from '@nestjs/common';
import { Currency } from '@jeevesInc/dto-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService implements OnModuleInit {
  constructor(
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>
  ) {}

  async onModuleInit() {
    const currencies = [
      { isoCode: 'USD', name: 'US Dollar' },
      { isoCode: 'CAD', name: 'Canadian Dollar' },
      { isoCode: 'EUR', name: 'Euro' },
      { isoCode: 'GBP', name: 'Pound Sterling' },
    ];
    const count = await this.currencyRepository.count();
    if (currencies.length != count) {
      await this.currencyRepository.delete({});
      console.log(`db cleanup`);
      await this.currencyRepository.save(currencies);
      console.log(`seeder executed`);
    } else {
      console.log(`seeder not needed >>> ${count}`);
    }
  }

  async getCurrencies(): Promise<Currency[]> {
    return this.currencyRepository.find();
  }
}
