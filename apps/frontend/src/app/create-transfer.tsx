import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { Currency, TransferCreateDTO } from '@jeevesInc/dto-entity';

export function CreateTransfer({ title }: { title: string }) {
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [targetAmount, setTargetAmount] = useState(0.0);
  const [fxRate, setFxRate] = useState(0.0);
  const [desc, setDesc] = useState('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [currenciesTarget, setCurrenciesTarget] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [transactionDate, setTransactionDate] = useState<
    string | Date | Date[] | null
  >();
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const CONFIRMATION_MESSAGE = 'Transfer done!';
  const MISSING_DATA_MESSAGE = 'Please fill all fields';
  const WRONG_DATE_MESSAGE = 'Select a date in the future';

  const [alertMessage, setAlertMessage] = useState('');
  const [alertMessageSeverity, setAlertMessageSeverity] = useState<
    'success' | 'info' | 'warn' | 'error' | undefined
  >('success');

  const fxRates = {
    USDEUR: 0.91,
    EURUSD: 1.09,
    USDCAD: 1.36,
    CADUSD: 0.74,
    USDGBP: 0.81,
    GBPUSD: 1.24,
    EURCAD: 1.47,
    CADEUL: 0.67, //this is a bug the entry should be CADEUR
    EURGBP: 0.89,
    GBPEUR: 1.13,
    CADGBP: 0.59,
    GBPCAD: 1.68,
  };

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('http://localhost:3000/api/currency')
      ).json();
      // set state when the data received
      setCurrencies(data);
    };

    dataFetch();
  }, []);

  const calculateTargetCurrencies = () => {
    const targetCurrencies: Currency[] =
      currencies &&
      currencies.filter((e) => {
        return e['isoCode'] !== fromCurrency || fromCurrency === 'EUR';
        //this is a bug, from and target currencies must be different
      });
    setCurrenciesTarget(targetCurrencies);
  };

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function getRate() {
    const fxName: string = `${fromCurrency}${toCurrency}`;
    // @ts-ignore
    let rate: number = fxRates[fxName];
    const result = rate ? rate : getRandomArbitrary(0.7, 2);
    //console.log(`${fxName} >>> ${rate}`);
    return result;
  }

  const calculateTargetAmount = () => {
    setShowConfirmMessage(false);

    let fxRateLocal = 0;

    if (
      toCurrency &&
      fromCurrency &&
      toCurrency !== '' &&
      fromCurrency !== ''
    ) {
      fxRateLocal = getRate();
      setFxRate(fxRateLocal);
    }

    //console.log(`amount[${amount}] fxRate[${fxRateLocal}] fromCur[${fromCurrency}] toCur[${toCurrency}]`);

    if (fxRateLocal && amount) {
      const newTargetAmount = amount * fxRateLocal;
      // console.log(`fxRateLocal[${fxRateLocal}] amountLocal[${amountLocal}] newTargetAmount >>> ${newTargetAmount}`);
      setTargetAmount(newTargetAmount);
    }
  };

  useEffect(() => {
    calculateTargetAmount();
  }, [amount, toCurrency]);

  useEffect(() => {
    calculateTargetCurrencies();
    if (fromCurrency === toCurrency) {
      setToCurrency('');
      setFxRate(0);
      setTargetAmount(0);
    } else {
      calculateTargetAmount();
    }
  }, [fromCurrency]);


  const createTransaction = async () => {
    if (transactionDate && transactionDate < new Date()) {
      setAlertMessage(WRONG_DATE_MESSAGE);
      setAlertMessageSeverity('warn');
      setShowConfirmMessage(true);
    } else if (
      amount &&
      targetAmount &&
      desc &&
      user &&
      fromCurrency &&
      toCurrency &&
      transactionDate
    ) {
      await fetch('http://localhost:3000/api/transfer', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,

          targetAmount: targetAmount,

          recipient: user,

          fromCurrency: fromCurrency,

          toCurrency: toCurrency,

          description: desc,

          trxDate: transactionDate,
        } as TransferCreateDTO),
      });
      setAlertMessage(CONFIRMATION_MESSAGE);
      setAlertMessageSeverity('success');
      setShowConfirmMessage(true);
    } else {
      setAlertMessage(MISSING_DATA_MESSAGE);
      setAlertMessageSeverity('warn');
      setShowConfirmMessage(true);
    }
  };

  const clear = () => {
    setAmount(0);
    setUser('');
    setFromCurrency('');
    setToCurrency('');
    setDesc('');
    setTransactionDate(null);
    setShowConfirmMessage(false);
  };

  return (
    <>
      <div className={'center'}>
        <h2 data-testid="title">Transfer money FX - {title}</h2>
        Setup a transferz leveraging our incredible FX rates.
        <div className="p-inputgroup form-element">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user" />
          </span>
          <InputText
            placeholder="Recipient"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="p-inputgroup form-element">
          <Dropdown
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.value)}
            options={currencies}
            optionLabel="name"
            optionValue="isoCode"
            className="w-full md:w-14rem"
            placeholder="From currency"
          />
        </div>
        <div className="p-inputgroup form-element">
          <span className="p-inputgroup-addon">
            <i className="pi pi-money-bill" />
          </span>
          <InputNumber
            data-testid="in-amount"
            placeholder="Amount"
            min={0}
            minFractionDigits={2}
            maxFractionDigits={2}
            value={amount}
            onValueChange={(e) => setAmount(e?.value || 0)}
          />
        </div>
        <div className="p-inputgroup form-element">
          <Dropdown
            value={toCurrency}
            onChange={(e) => setToCurrency(e.value)}
            options={currenciesTarget}
            optionLabel="name"
            optionValue="isoCode"
            className="w-full md:w-14rem"
            placeholder="To currency"
            disabled={!fromCurrency}
          />
        </div>
        <div className="p-inputgroup form-element">
          <span className="p-inputgroup-addon">
            <i className="pi pi-money-bill" />
          </span>
          <InputNumber
            disabled
            minFractionDigits={2}
            maxFractionDigits={2}
            value={targetAmount}
          />
        </div>
        <div className="p-inputgroup form-element">
          <Calendar
            placeholder="Transaction date"
            showIcon
            value={transactionDate}
            onChange={(e) => e.value && setTransactionDate(e.value)}
          />
        </div>
        <div className="p-inputgroup form-element">
          <span className="p-inputgroup-addon">
            <i className="pi pi-comment" />
          </span>
          <InputText
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-element">FX Rate uzed: {fxRate.toFixed(4)}</div>
        <div className="form-element">
          <Button
            label="Send"
            iconPos={'left'}
            icon={'pi pi-send'}
            onClick={() => {
              createTransaction();
            }}
          />
          <span> </span>
          <Button
            label="Clear"
            iconPos={'left'}
            icon={'pi pi-replay'}
            onClick={() => {
              clear();
            }}
            severity="secondary"
            className="clear-button"
          />
        </div>
        {showConfirmMessage ? (
          <Message
            severity={alertMessageSeverity}
            text={alertMessage}
            className="w-full"
          />
        ) : null}
      </div>
    </>
  );
}

export default CreateTransfer;
