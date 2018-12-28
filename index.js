let EC = require('elliptic').ec;
const {StringDecoder} = require('string_decoder');
const sha256 = require('js-sha256');

const decoder = new StringDecoder('utf8');

let mess = "test";
let hash = sha256.create();
hash.update(mess);
let ec = new EC('p256');
let key = ec.genKeyPair();
let signature = key.sign(hash.array());
// Export DER encoded signature in Array
let derSign = signature.toDER();
let strSign = signature.toString();

console.log(key);
console.log(key.getPublic());
console.log(signature);
console.log(hash.array());
// Verify signature
console.log(key.verify(hash.array(), derSign));
