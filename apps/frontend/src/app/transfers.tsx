import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Transfer } from '@jeevesInc/dto-entity';

class DateTimeFormatOptions {}

export function Transfers() {
  const [transactions, setTransactions] = useState<Transfer[]>([]);

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/transfer')
      ).json();
      // set state when the data received
      setTransactions(data);
    };

    dataFetch();
  }, []);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as DateTimeFormatOptions;

  return (
    <>
      <div className={'center'}>
        <h2 data-testid="title">List of transactions</h2>

        {transactions.map((trx, index) => (
          <Card
            key={trx.id}
            className="card"
            title={'Recipient: ' + trx.recipient}
            subTitle={new Date(trx?.trxDate || 0).toLocaleDateString(
              'en-US',
              options
            )}
            footer={
              'Created at ' +
              new Date(trx?.timestamp || 0).toLocaleDateString('en-US', options)
            }
          >
            <div>
              <strong>Amount sent:</strong> {trx.amount} {trx.fromCurrency}
            </div>
            <div>
              <strong>Amount received:</strong> {trx.targetAmount}{' '}
              {trx.toCurrency}
            </div>
            <div>
              <strong>Description:</strong>
            </div>
            <blockquote>{trx.description}</blockquote>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Transfers;
