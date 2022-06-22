import { generateAllFundedWallets, isValidNetwork } from './lib/utils';
import codec from 'ripple-address-codec';
import { payment } from './lib/xrpl/payment';
import { validNetworks } from './lib/constants/faucets';
import { WalletObj } from '../types/wallet';

const main = async ({
  publicAddress,
  destinationTag,
  xAddress,
  amount,
  network,
}: {
  publicAddress: string;
  destinationTag?: number;
  xAddress?: string;
  amount?: string;
  network?: string;
}) => {
  const input = {
    publicAddress: publicAddress,
    destinationTag: destinationTag,
    xAddress: xAddress,
    amount: amount,
    network: network,
  };

  if (input.network) {
    let isValid = isValidNetwork(input.network);
    if (!isValid) return 'not valid network';
  }

  if (input.xAddress) {
    let isValid = codec.isValidXAddress(input.xAddress);
    if (!isValid) return 'not as valid xAdress';
    let account = codec.xAddressToClassicAddress(input.xAddress);

    input.publicAddress = account.classicAddress;
    if (account.tag !== false) input.destinationTag = account.tag;
  }

  let fundedWallets = await generateAllFundedWallets();

  // Wait for wallets to be created and funded before proceeding to payment
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  fundedWallets.forEach(async (wallet: WalletObj) => {
    let response;
    let tempNetwork = '';
    if (input.network) tempNetwork = input.network;
    if (input.network) {
      if (wallet.type !== input.network) return;
      response = await payment(
        Object.assign({ wallet: wallet }, input, { network: tempNetwork })
      );
    }
    if (!input.network) {
      validNetworks.forEach(async (network) => {
        if (wallet.type !== network) return;
        response = await payment(
          Object.assign({ wallet: wallet }, input, { network: network })
        );
        console.log(response);
      });
    }
  });
  return;
};

export default main;
