import xrplFunder from '@thebettermint/xrpl-auto-funder';

const main = async () => {
  let response = await xrplFunder({
    xAddress: 'T7AhgLLKhQDifNt8FceQ8P6RXFmeoQBLKjTGYaqZnUW5AC7',
    network: 'testnet',
  });
  console.log(response);
};

main();
