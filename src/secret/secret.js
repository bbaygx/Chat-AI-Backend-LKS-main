import CryptoJS from "crypto-js";

const generateSecureSecret = () => {
  const secretLength = 32;
  const randomBytes = CryptoJS.lib.WordArray.random(secretLength);
  const secret = CryptoJS.enc.Hex.stringify(randomBytes);
  return secret;
};

const secret = generateSecureSecret();
console.log("Secure secret:", secret);
