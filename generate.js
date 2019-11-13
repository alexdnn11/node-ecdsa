const fs = require('fs');
const EC = require('elliptic').ec;
const sha256 = require('js-sha256');

const fileName = 'data.json';
// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair();

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

var signature = key.sign(hash.array());

// Export DER encoded signature in Array
var derSign = signature.toDER();

// Verify signature
console.log(key.verify(hash.array(), derSign));

// CHECK WITH NO PRIVATE KEY

var pubPoint = key.getPublic();

// Verify signature

console.log(key.verify(hash.array(), signature));


const customerKey = {
    public: {
        x: pubPoint.getX(),
        y: pubPoint.getY()
    },
    private: key.priv,
    signature:{
        r: signature.r.toString('hex'),
        s: signature.s.toString('hex')
    }
}

const jsonString = JSON.stringify(customerKey);

fs.writeFile(`${fileName}`, jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
});


