/**
 * SHA-256 hashing utility for Meta Pixel Advanced Matching.
 * Facebook requires customer data to be hashed before sending.
 * Uses the Web Crypto API (works in all modern browsers).
 */

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash customer data for Meta Pixel Advanced Matching.
 * @param {Object} data - { email, phone, firstName, lastName }
 * @returns {Object} - Hashed values ready for fbq()
 */
export async function hashCustomerData({ email, phone, firstName, lastName }) {
  const result = {};

  if (email) {
    result.em = await sha256(email);
  }
  if (phone) {
    // Normalize phone: remove spaces, dashes, brackets. Keep + sign.
    const cleanPhone = phone.replace(/[\s\-().]/g, '');
    result.ph = await sha256(cleanPhone);
  }
  if (firstName) {
    result.fn = await sha256(firstName);
  }
  if (lastName) {
    result.ln = await sha256(lastName);
  }

  return result;
}
