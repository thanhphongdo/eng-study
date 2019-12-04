// const ethers = require('ethers');
// console.log(ethers);
export default class EtherService {
    contract = null;
    wallet = null;
    provider = null;
    url = null;
    contractAddress = null;
    abi = null;
    privateKey = null;
    constructor(url, contractAddress, abi) {
        this.url = url;
        this.contractAddress = contractAddress;
        this.abi = abi;
    }

    newProvider() {
        this.provider = new ethers.providers.JsonRpcProvider(this.url);
    }

    newWallet() {
        this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    }

    newContract() {
        this.contract = new ethers.Contract(this.contractAddress, this.abi, this.wallet);
    }

    setPrivateKey(privateKey) {
        this.privateKey = privateKey;
    }

    init() {
        this.newProvider();
        this.newWallet();
        this.newContract();
    }

    async test(val) {
        return await this.contract.test();
    }

    call(funcName, params) {
        return this.contract[funcName](...params);
    }
}
