import { generateAllFundedWallets, generateFundedWallet } from '../src';

describe('generate', () => {
  test('all', async () => {
    let response = await generateAllFundedWallets();
    console.log(response);
  });

  test('single', async () => {
    let response = await generateFundedWallet('testnet');
    console.log(response);
  });
});
