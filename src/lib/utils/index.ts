import { faucets, validNetworks } from '../constants/faucets';
import axios from 'axios';

const parseHooksResponse = (data: {
  address: string;
  secret: string;
  xrp: number;
  hash: string;
  code: string;
}) => {
  return {
    data: {
      account: {
        xAddress: '',
        secret: data.secret,
        classicAddress: data.secret,
        address: data.secret,
      },
      amount: data.xrp,
      balance: data.xrp,
    },
  };
};

export const generateFundedWallet = async (network: string) => {
  try {
    let url: string | undefined = faucets[network];
    if (!url) throw Error(`faucet not found for ${network}`);
    let response = await axios.post(url);
    if (network === 'hooks') return parseHooksResponse(response.data);
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
