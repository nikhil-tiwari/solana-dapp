import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import RequestAirdrop from './RequestAirdrop';
import ShowBalance from './ShowBalance';
import SendTransaction from './SendTransaction';
import SignMessage from './SignMessage';

function App() {

  return (
    <ConnectionProvider endpoint={'https://api.devnet.solana.com/'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className='mt-8 flex justify-evenly'>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <RequestAirdrop />
          <ShowBalance />
          <SendTransaction />
          <SignMessage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
