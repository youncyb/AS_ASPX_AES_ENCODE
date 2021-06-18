'use strict';

const path = require('path');

var CryptoJS = require(path.join(window.antSword.remote.process.env.AS_WORKDIR, 'node_modules/crypto-js'));

function randomRange(min, max){
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max-min)) + min : min),
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i<range; i++){
        var index = Math.round(Math.random() * (charStr.length-1));
        returnStr += charStr.substring(index,index+1);
    }
    return returnStr;
}

// AES return base64 type of encodedtext
function encryptTextByAes(keyStr, text){
  let encodedtext = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(keyStr), {
    iv: CryptoJS.enc.Utf8.parse(keyStr),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  }).toString()
  return encodedtext;

}


module.exports = (pwd, data, ext={}) => {
  let min = 16;
  let max = 16;
  let aesKey = randomRange(min, max);
  data[pwd] = Buffer.from(aesKey).toString("base64") + encryptTextByAes(aesKey, data['_']);

  delete data['_'];

  return data;
}