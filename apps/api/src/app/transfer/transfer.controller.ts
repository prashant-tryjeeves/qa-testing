import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferCreateDTO } from '../../../../../libs/dto-entity/src/lib/dto/transfer.dto';

@Controller('/transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  async create(@Body() dto: TransferCreateDTO) {
    return this.transferService.create(dto);
  }

  @Get()
  async getAll() {
    return this.transferService.fetchAll();
  }
}
