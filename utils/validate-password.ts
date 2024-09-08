import { compare } from 'bcrypt';

export function validPassword(
  passwordFromDB: string,
  passwordToValidate: string,
) {
  return compare(passwordToValidate, passwordFromDB);
}
