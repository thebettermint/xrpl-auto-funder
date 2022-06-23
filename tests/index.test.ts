import index from '../src';

describe('Test funding xrpl wallet', () => {
  test('testing index with no network defined', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      destinationTag: 123,
    });
    console.log(response);
  }, 30000);

  /*   test('testing index with a network defined', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
      network: 'testnet',
    });
    console.log(response);
  }, 30000);

  test('testing index with a network defined and xAddress', async () => {
    let response = await index({
      xAddress: 'T7AhgLLKhQDifNt8FceQ8P6RXFmeoQBLKjTGYaqZnUW5AC7',
      network: 'testnet',
    });
    console.log(response);
  }, 30000); */
});
