import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const saltRounds = 12; // number of hashing rounds for security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}