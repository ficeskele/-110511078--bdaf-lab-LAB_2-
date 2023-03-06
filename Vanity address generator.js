//try 
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet');

function generateMnemonic(_pre) {
  let mnemonic;
  let found = false;

  while (!found) {
    mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdWallet = hdkey.hdkey.fromMasterSeed(seed).derivePath("m/44'/60'/0'/0/0");
    const wallet = hdWallet.getWallet();
    const address1 = wallet.getAddressString();
    
    found = address1.startsWith(`0x${_pre}`);
    
  }


  return mnemonic;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Please enter your prefix: ', prefi => {
    const mnemonic = generateMnemonic(prefi);
    console.log(mnemonic);
    readline.close();
  });
  

// Usage example: generate mnemonic with prefix "1234"

