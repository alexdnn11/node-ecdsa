const fs = require('fs');
const EC = require('elliptic').ec;
const sha256 = require('js-sha256');

const fileName = 'data.json';

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Sign the message's hash (input must be an array, or a hex-string)
let mess = {
    Id: '1',
    Issuer: 'a',
    Beneficiary: 'b',
    Status: 1,
    DateOfIssue: 1577836800,
    PlainText: 'text',
    Signature: 'signed by a'
};

let hash = sha256.create();
hash.update(JSON.stringify(mess));


let userKeyJSON = fs.readFileSync(`${fileName}`);
let userKey = JSON.parse(userKeyJSON);

var pub = {x: userKey.public.x.toString('hex'), y: userKey.public.y.toString('hex')};         // case 2

// Import public key
var key = ec.keyFromPublic(pub, 'hex');

// Signature MUST be either:

var signature = {r: userKey.signature.r.toString('hex'), s: userKey.signature.s.toString('hex')}; // case 3


// Verify signature

console.log(key.verify(hash.array(), signature));





