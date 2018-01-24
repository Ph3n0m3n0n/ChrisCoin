const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    } 
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }
    generateGenesisBlock() {
        return new Block(0, "02/01/2018", "ChrisCoin to the Moon!", "0");
    }
    getLastBlock() {
        return this.chain [this.chain.length -1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let ChrisCoin = new Blockchain();

ChrisCoin.addBlock(new Block(1, "02/10/2018", {amount: 100}));
ChrisCoin.addBlock(new Block(2, "02/10/2018", {amount: 300}));

console.log(JSON.stringify(ChrisCoin, null, 4));