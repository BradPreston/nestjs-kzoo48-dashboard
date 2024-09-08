import { hash } from 'bcrypt';

export async function createPasswordHash(password: string) {
  // hash the password with 10 salt rounds
  return await hash(password, 10);
}
