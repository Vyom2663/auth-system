"use server"

import { cookies } from 'next/headers';

export const getServerToken = async (key: string): Promise<string | null> => {
  const cookie =  (await cookies()).get(key)?.value
  return cookie ?? null;
};  