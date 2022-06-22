import { faucets, validNetworks } from '../constants/faucets';
import axios from 'axios';

export const generateFundedWallet = async (network: string) => {
  try {
    let url: string | undefined = faucets[network];
    if (!url) throw Error(`faucet not found for ${network}`);
    let response = await axios.post(url);
    return response;
  } catch (error: any) {
    return Error(error);
  }
};

export const generateAllFundedWallets = async () => {
  let allFaucets = Object.keys(faucets);
  let walletArray = await Promise.all(
    allFaucets
      .map(async (faucet: string) => {
        let wallet = await generateFundedWallet(faucet);
        if (!(wallet instanceof Error))
          return Object.assign({ type: faucet }, wallet.data);
        return;
      })
      .filter(Boolean)
  );
  return walletArray;
};

export const isValidNetwork = async (network: string) => {
  return validNetworks.includes(network);
};
