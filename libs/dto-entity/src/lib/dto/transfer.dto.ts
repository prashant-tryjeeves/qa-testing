export class TransferCreateDTO {
  amount?: number;

  targetAmount?: number;

  recipient?: string;

  fromCurrency?: string;

  toCurrency?: string;

  description?: string;

  trxDate?: Date;
}
