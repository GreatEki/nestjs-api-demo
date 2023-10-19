import * as bcrypt from 'bcrypt';

export const hashData = async (data: string) => {
  return await bcrypt.hash(data, bcrypt.genSaltSync(10));
};

export const compareHashData = async (rawData: string, hashedData: string) => {
  return await bcrypt.compare(rawData, hashedData);
};
