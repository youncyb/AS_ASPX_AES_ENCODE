'use strict';


const path = require('path');

var CryptoJS = require(path.join(window.antSword.remote.process.env.AS_WORKDIR, 'node_modules/crypto-js'));


function decryptText(keyStr, text) {
  let decodedtext = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(keyStr), {
    iv: CryptoJS.enc.Utf8.parse(keyStr),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  }).toString(CryptoJS.enc.Utf8);
  return decodedtext;
}

module.exports = {
  asoutput: () => {
    return `
        function B64Encode(bytes){
            return System.Convert.ToBase64String(bytes);
        }
        function Encrypt(plaintext, aesKey){
            var aesKeyBytes = utf8.GetBytes(aesKey);
            var aesEnc = aes.CreateEncryptor(aesKeyBytes, aes.IV);
            var plainBytes = utf8.GetBytes(plaintext);
            var cipherBytes = aesEnc.TransformFinalBlock(plainBytes, 0, plainBytes.length);
            var res = B64Encode(cipherBytes);
            return res;
        }
        function asenc(opcode){
            var ak = aesKey;
            return ak + Encrypt(opcode, ak);
        }
    `.replace(/\n\s+/g, '');
  },

  decode_buff: (data, ext={}) => {
    data = data.toString();
    try{
      let aesKey = data.substring(0, 16);
      return Buffer.from(decryptText(aesKey, data.substring(16)));
    }
    catch(e){
      return data;
    }
  }
}