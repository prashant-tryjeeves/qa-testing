import CreateTransfer from './create-transfer';
import { useState } from 'react';
import Transfers from './transfers';
import { SelectButton } from 'primereact/selectbutton';

export function App() {
  const [showPaymentTab, setShowTransfers] = useState(true);
  const options = [
    { label: 'Show transfers', value: false },
    { label: 'Make a transfer', value: true },
  ];

  if (showPaymentTab) {
    return (
      <>
        <div className={'center'}>
          <SelectButton
            value={showPaymentTab}
            onChange={(e) => setShowTransfers(e.value)}
            options={options}
            data-testid="menubutton"
          />
        </div>
        <CreateTransfer title="QA test" />
      </>
    );
  } else {
    return (
      <>
        <div className={'center'}>
          <SelectButton
            value={showPaymentTab}
            onChange={(e) => setShowTransfers(e.value)}
            options={options}
            data-testid="menubutton"
          />
        </div>
        <Transfers />
      </>
    );
  }
}

export default App;
