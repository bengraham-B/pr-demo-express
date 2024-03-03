const CryptoJS = require("crypto-js")
require("dotenv").config()

function decryptAuthFunc(data){
	try {
		const bytes = CryptoJS.AES.decrypt(data, process.env.SECRET_AUTH_KEY);
		const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
		const [decryptedUserName, decryptedPassword] = decryptedText.split(':');
		return { decryptedUserName, decryptedPassword };

	} catch (error) {
		console.error('Error decrypting credentials:', error.message);
		return null;
	}
};

module.exports = { decryptAuthFunc }