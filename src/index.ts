import { generateAllFundedWallets } from './lib/utils';
import { payment } from './lib/xrpl/payment';
import { validNetworks } from './lib/constants/faucets';
import { WalletObj } from '../types/wallet';
import { parseInput } from './parse';
import { wait } from './lib/utils/wait';

const main = async ({
  publicAddress,
  destinationTag,
  xAddress,
  amount,
  network,
}: {
  publicAddress?: string;
  destinationTag?: number;
  xAddress?: string;
  amount?: string;
  network?: string;
}) => {
  let input = parseInput({
    publicAddress: publicAddress,
    destinationTag: destinationTag,
    xAddress: xAddress,
    amount: amount,
    network: network,
  });
  if (input instanceof Error) return input;
  let fundedWallets = await generateAllFundedWallets();

  // Wait for wallets to be created and funded before proceeding to payment
  await wait(5000);

  let responseArray = await Promise.all(
    fundedWallets.map(async (wallet: WalletObj) => {
      if (input instanceof Error) return;
      let tempNetwork = input.network ? input.network : '';

      if (input.network) {
        if (wallet.type !== input.network) return;
        return await payment(
          Object.assign({ wallet: wallet }, input, { network: tempNetwork })
        );
      }

      if (!input.network) {
        let responseArray = await Promise.all(
          validNetworks.map(async (network) => {
            if (input instanceof Error) return;
            if (wallet.type !== network) return;
            return await payment(
              Object.assign({ wallet: wallet }, input, { network: network })
            );
          })
        );
        return responseArray.filter(Boolean);
      }
      return;
    })
  );

  return responseArray
    .map((index: any) => {
      console.log(typeof index);
      if (!index) return;
      if (!(index instanceof Array)) return index;
      return index[0];
    })
    .filter(Boolean);
};

export default main;
