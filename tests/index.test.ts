import index from '../src';

describe('funder', () => {
  test('no-network', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      destinationTag: 123,
    });
    console.log(response);
  }, 30000);

  test('testnet', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      network: 'testnet',
    });
    console.log(response);
  }, 30000);

  test('nft', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      network: 'nft',
    });
    console.log(response);
  }, 30000);

  test('devnet', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      network: 'devnet',
    });
    console.log(response);
  }, 30000);

  test('locking', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      network: 'locking',
    });
    console.log(response);
  }, 30000);

  test('xaddress', async () => {
    let response = await index({
      xAddress: 'T7AhgLLKhQDifNt8FceQ8P6RXFmeoQBLKjTGYaqZnUW5AC7',
      network: 'testnet',
    });
    console.log(response);
  }, 30000);
});
