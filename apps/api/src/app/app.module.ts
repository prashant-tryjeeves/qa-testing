import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Currency } from '../../../../libs/dto-entity/src/lib/entities/currency.entity';
import { CurrencyModule } from './currency/currency.module';
import { TransferModule } from './transfer/transfer.module';
import { Transfer } from '../../../../libs/dto-entity/src/lib/entities/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user_qa',
      password: 'P4ssword!!',
      database: 'db_qa',
      entities: [Currency, Transfer],
      synchronize: true,
    }),
    CurrencyModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
