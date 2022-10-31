import { importKey } from '@taquito/signer';
import { MichelCodecPacker, TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://jakartanet.ecadinfra.com');
importKey(Tezos, "p2sk2obfVMEuPUnadAConLWk7Tf4Dt3n4svSgJwrgpamRqJXvaYcg1")

Tezos.contract
  .originate({
    code:'./fa2_nft-mich.json',
    storage: {
        balances: empty_map,
        metadata: contract_metadata,
        token_metadata: token_metadata,
    },
  })
  .then((originationOp) => {
    console.log(`Waiting for confirmation of origination for ${originationOp.contractAddress}...`);
    return originationOp.contract();
  })
  .then((contract) => {
    console.log(`Origination completed.`);
  })
  .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));