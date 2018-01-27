const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        this.chain = [this.generateGenesisBlock()];
    }

    generateGenesisBlock() {
        return new Block(0, "02/01/2017", "ChrisCoin to the Moon!!!", "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    verifyChain() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let ChrisCoin = new Blockchain();

ChrisCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
ChrisCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));


console.log('Blockchain valid? ' + ChrisCoin.verifyChain());

console.log('Changing a block...');
ChrisCoin.chain[1].data = { amount: 100 };
// ChrisCoin.chain[1].hash = ChrisCoin.chain[1].calculateHash();

console.log("Blockchain valid? " + ChrisCoin.verifyChain());

console.log(JSON.stringify(ChrisCoin, null, 4));

// console.log(JSON.stringify(ChrisCoin, null, 4));
