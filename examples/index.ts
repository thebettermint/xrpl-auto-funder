import xrplFunder from '@thebettermint/auto-xrpl-funder';

const main = async () => {
  let response = await xrplFunder({
    xAddress: 'T7AhgLLKhQDifNt8FceQ8P6RXFmeoQBLKjTGYaqZnUW5AC7',
    network: 'testnet',
  });
  console.log(response);
};

main();
