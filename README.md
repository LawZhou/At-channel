# @Channel: Decentralized platform for video publishing

A decentralized platform for video publishing with comment posting and video rating

## Required Dependencies

package.json:

```Json
    "@truffle/hdwallet-provider": "^1.1.0",
    "babel-polyfill": "6.26.0",
    "babel-preset-env": "1.7.0",
    "babel-preset-es2015": "6.24.1",
    "babel-preset-stage-2": "6.24.1",
    "babel-preset-stage-3": "6.24.1",
    "babel-register": "6.26.0",
    "bootstrap": "^4.5.2",
    "chai": "4.2.0",
    "chai-as-promised": "7.1.1",
    "chai-bignumber": "3.0.0",
    "dotenv": "^8.2.0",
    "identicon.js": "^2.3.3",
    "ipfs-http-client": "^33.1.1",
    "react": "^16.13.1",
    "react-bootstrap": "^1.3.0",
    "react-dom": "^16.13.1",
    "react-scripts": "^3.4.3",
    "truffle": "^5.1.45",
    "truffle-hdwallet-provider-privkey": "^0.3.0",
    "web3": "^1.3.0",
    "antd": "^4.8.5"
```

Other dependencies:

```
    "solidity": ^0.5.0;
    Ganache version: Version 2.5.4 (2.5.4.1367)
    yarn version: 6.14.8


```

## Operating System used to test

MacOs Big Sur Version 11.0.1

## Setup Instuctions

1. Install all the dependencies listed within **package.json** in the local **node_modules** folder.

``` Terminal
npm install
```

2. Open **Ganache** under Quickstart mode.

3. Deploy the contracts to the blockchain.

```Terminal
truffle migrate
```

4. Add a custom RPC into **MetaMask** using url: <HTTP://127.0.0.1:7545> and Chain ID: 1337

5. Import an account into **MetaMask** from **Ganache** using the provided private key.

6. Start the server by enter

``` Terminal
npm start
```
in the terminal.

7. After the server successfully launched, enter <localhost:3000> in the browser and you can see the application.

## Running instruction

1. Try uploading videos, switching between videos, posting comments, rating the videos.

2. Try switching your account and repeat step 2.
