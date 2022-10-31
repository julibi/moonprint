"use strict";
exports.__esModule = true;
var signer_1 = require("@taquito/signer");
var taquito_1 = require("@taquito/taquito");
var Tezos = new taquito_1.TezosToolkit('https://jakartanet.ecadinfra.com');
(0, signer_1.importKey)(Tezos, "p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1");
Tezos.contract
    .originate({
    code: './fa2_nft-mich.json',
    storage: {
        stored_counter: 0,
        threshold: 1,
        keys: ['edsk2swG95pu9gLuX7ayQxuD3vy4tCMN7nRtSzN67htnRz76uE1nSG']
    }
})
    .then(function (originationOp) {
    console.log("Waiting for confirmation of origination for ".concat(originationOp.contractAddress, "..."));
    return originationOp.contract();
})
    .then(function (contract) {
    console.log("Origination completed.");
})["catch"](function (error) { return console.log("Error: ".concat(JSON.stringify(error, null, 2))); });
