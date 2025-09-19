const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_SECRET;
const ivLength = 12;

if (!secretKey || secretKey.length !== 32) {
    throw new Error('ENCRYPTION_SECRET должен быть длиной 32 символа');
}

function encrypt(text) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const tag = cipher.getAuthTag();
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(data) {
    const parts = data.split(':');
    if (parts.length !== 3) throw new Error('Неверный формат зашифрованных данных');
    const iv = Buffer.from(parts[0], 'hex');
    const tag = Buffer.from(parts[1], 'hex');
    const encryptedText = Buffer.from(parts[2], 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encryptedText, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function safeDecrypt(data) {
  if (!data || typeof data !== 'string') return '';
  if (!data.includes(':')) return data; // нет шифра — вернуть как есть
  try {
    const decrypted = decrypt(data);
    return decrypted;
  } catch (e) {
    console.error('Ошибка расшифровки:', e);
    return data; // вернуть как есть если не удалось расшифровать
  }
}



module.exports = { encrypt, decrypt, safeDecrypt };
