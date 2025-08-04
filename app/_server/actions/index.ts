"server-only";

import { cookies } from "next/headers";

export const registerConsent = async (cookieName: string) => {
  const c = await cookies();

  c.set(cookieName, "accepted");
};

export const validateConsent = async (cookieName: string) => {
  const c = await cookies();

  return c.get(cookieName) !== undefined;
};
