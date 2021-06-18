/**
 * aspx::default解码器
 */

'use strict';

module.exports = {
  asoutput: () => {
    return `
    function asenc(opcode){
      return opcode;
    }
    `.replace(/\n\s+/g, '');
  },
  decode_buff: (buff) => {
    return buff;
  }
}