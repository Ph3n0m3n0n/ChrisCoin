const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.generateGenesisBlock()];
    }

    generateGenesisBlock() {
        return new Block (0, "01/02/2018", "This kicks off the ChrisCoin Blockchain", "0");
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

let chrisCoin = new Blockchain();

chrisCoin.addBlock(new Block (1, "01/02/2018", { amount : 100 } ));
chrisCoin.addBlock(new Block (2, "10/02/2018", { amount : 300 } ));

console.log(JSON.stringify(chrisCoin, null, 4));