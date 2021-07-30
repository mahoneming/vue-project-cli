//	对称加密

const CryptoJS = require( 'crypto-js' );

const secretText = 'Dtt123456';

//	加密
export const ciphertext = data => CryptoJS.AES.encrypt( data, secretText ).toString();

// 解密
export const originalText = ( text ) => {
	const bytes = CryptoJS.AES.decrypt( decodeURIComponent( text ).replace( / /g, '+' ), secretText );

	return bytes.toString( CryptoJS.enc.Utf8 );
};
