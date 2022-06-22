import index from '../src';

describe('Test funding wallet on all networks', () => {
  test('index', async () => {
    let response = await index({
      publicAddress: 'rMfCZhBfR4tRunHaE9jrtdsjF5stuuQ9JB',
    });
    console.log(response);
  });
});
