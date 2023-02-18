# xrpl-auto-funder

A package to programmically fund xrpl accounts using public faucets

## Getting Started

To get started using this project, install the node package into your project

```node
npm install @thebettermint/xrpl-auto-funder
```

```yarn
yarn add @thebettermint/xrpl-auto-funder
```

## Methods

#### xrplFunder

```ts
import xrplFunder from '@thebettermint/xrpl-auto-funder';

let response = await xrplFunder(params);

// Logging response
console.log(response);
```

#### Options

```ts
params = {
    publicAddress?: String, // Valid "r....." xrpl address to send funds.
    destinationTag?: Number, // Destination tag for xrpl address to send funds.
    xAddress?: String, // Valid "x....." xrpl address to send funds. If provided, publicAddress and destinationTag parameters are not required.
    amount?: String, // Amount to send from the faucet accounts. If left balance, the maximum amount will be sent from the faucet account.
    network?: String || String[], // Define a network to send the funds. If blank, funds will be send on all of the available networks
    // Format and all eligible networks => [ 'testnet', 'devnet', 'nft', 'hooks']
}
```

#### generateFundedWallet

```ts
import { generateFundedWallet } from '@thebettermint/xrpl-auto-funder';

let response = await generateFundedWallet(network);

// Logging response
console.log(response);
```

#### Options

```ts
network: String;
// Available options -> 'testnet', 'devnet', 'nft', 'hooks'
```

#### generateAllFundedWallets

```ts
import { generateAllFundedWallets } from '@thebettermint/xrpl-auto-funder';

let response = await generateAllFundedWallets();

// Logging response
console.log(response);
```

## Examples

```ts
import xrplFunder from '@thebettermint/xrpl-auto-funder';

const main = async () => {
  let response = await xrplFunder({
    xAddress: 'T7AhgLLKhQDifNt8FceQ8P6RXFmeoQBLKjTGYaqZnUW5AC7',
    network: 'testnet',
  });
  console.log(response);
};

main();
```

[See more examples here](https://github.com/thebettermint/xrpl-auto-funder/blob/main/examples)

## Unit Testing

There are available unit test scripts. Below are the available test scripts and descripts, respectively.

```JSON
  "scripts": {
    "jest": "jest",
    "jest:no-network": "jest -t 'funder no-network'",
    "jest:testnet": "jest -t 'funder no-network'",
    "jest:nft": "jest -t 'funder no-network'",
    "jest:devnet": "jest -t 'funder no-network'",
    "jest:xaddress": "jest -t 'funder no-network'",
    "jest:single": "jest -t 'generate single'",
    "jest:genAll": "jest -t 'generate all'",
  },
  "scriptsComments": {
    "jest": "Run all unit tests",
    "jest:no-network": "Runs single test with no network defined",
    "jest:testnet": "Runs single test with testnet",
    "jest:nft": "Runs single test with nft devnet",
    "jest:devnet": "Runs single test with devnet",
    "jest:xaddress": "Runs single test with xaddress",
    "jest:single": "Run single test to check the faucet endpoint",
    "jest:genAll": "Run single test to check all faucet endpoints"
  },
```

## Contributing

Pull requests for new features, bug fixes, and suggestions are welcome! Please
create an issue for discussion before working on a substantial change.
[CONTRIBUTING.md](https://github.com/thebettermint/xrpl-auto-funder/blob/main/CONTRIBUTING.md)

## License

[GPL-3.0](https://github.com/thebettermint/xrpl-auto-funder/blob/main/LICENSE)

Copyright 2022 thebettermint
The GNU General Public License is a free, copyleft license for
software and other kinds of works.

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.
