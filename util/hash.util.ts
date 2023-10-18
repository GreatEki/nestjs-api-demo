import bcrypt from 'bcrypt';

export const hashData = (data: string) => {
  return bcrypt.hashSync(data, bcrypt.genSaltSync(10));
};

export const compareHashData = (rawData: string, hashedData: string) => {
  return bcrypt.compareSync(rawData, hashedData);
};
