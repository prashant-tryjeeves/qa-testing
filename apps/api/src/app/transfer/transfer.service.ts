import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '@jeevesInc/dto-entity';
import { TransferCreateDTO } from '@jeevesInc/dto-entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>
  ) {}

  async create(transferCreateDTO: TransferCreateDTO): Promise<boolean> {
    console.log(`create >>> ${JSON.stringify(transferCreateDTO)}`);
    if (transferCreateDTO.toCurrency === 'GBP') {
      transferCreateDTO.description = 'banana'; //this is a bug, if target currency is GBP the desc is overridden
    }
    if (
      transferCreateDTO.fromCurrency === 'USD' &&
      transferCreateDTO.toCurrency === 'CAD'
    ) {
      //this is another bug, the transfer is saved twice
      await this.transferRepository.save({
        ...transferCreateDTO,
        timestamp: new Date(),
      });
    }
    await this.transferRepository.save({
      ...transferCreateDTO,
      timestamp: new Date(),
    });
    return true;
  }

  async fetchAll(): Promise<Transfer[]> {
    return this.transferRepository.find({ order: { trxDate: 'DESC' } });
  }
}
