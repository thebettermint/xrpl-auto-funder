import { Client, Wallet } from 'xrpl';
import * as client from '../xrpl/client';
import { WalletObj } from '../../../types/wallet';
import { checkBalance } from '../xrpl/checkBalance';
import { servers } from '../constants/faucets';
import { validNetworks } from '../constants/faucets';

export const wait = async (time: number) => {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const fn = async (api: Client, signer: Wallet) => {
  while (true) {
    let resp = await checkBalance(api, signer.classicAddress);
    if (!(resp instanceof Error)) {
      api.disconnect();
      return false;
    }
    await wait(200);
  }
};

export const waitForActivation = async (fundedWallets: any[], input: any) => {
  return await Promise.all(
    fundedWallets.map(async (wallet: WalletObj) => {
      if (input instanceof Error) return;
      let tempNetwork = input.network ? input.network : '';

      if (input.network) {
        if (wallet.type !== input.network) return;

        let api = await client.init(servers[tempNetwork]);
        await api.connect();
        let signer = Wallet.fromSecret(wallet.account.secret);
        return await fn(api, signer);
      }

      if (!input.network) {
        let responseArray = await Promise.all(
          validNetworks.map(async (network) => {
            if (input instanceof Error) return;
            if (wallet.type !== network) return;

            let api = await client.init(servers[network]);
            await api.connect();
            let signer = Wallet.fromSecret(wallet.account.secret);
            return await fn(api, signer);
          })
        );
        return responseArray.filter(Boolean);
      }
      return;
    })
  );
};
