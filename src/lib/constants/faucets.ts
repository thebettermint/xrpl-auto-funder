import { FaucetObjType, ServerObjType } from '../../../types/faucets';

export const faucets: FaucetObjType = {
  testnet: 'https://faucet.altnet.rippletest.net/accounts',
  devnet: 'https://faucet.devnet.rippletest.net/accounts',
  nft: 'https://faucet-nft.ripple.com/accounts',
  hooks: 'https://hooks-testnet-v3.xrpl-labs.com/newcreds',
  locking: 'https://sidechain-faucet.devnet.rippletest.net/accounts',
};

export const servers: ServerObjType = {
  testnet: 'wss://s.altnet.rippletest.net:51233',
  devnet: 'wss://s.devnet.rippletest.net:51233',
  nft: 'wss://xls20-sandbox.rippletest.net:51233',
  hooks: 'wss://hooks-testnet-v2.xrpl-labs.com',
  locking: 'wss://sidechain-net1.devnet.rippletest.net:51233',
};

export const validNetworks = [
  'testnet',
  'devnet',
  'nft',
  'hooks',
  'issuing',
  'locking',
];
