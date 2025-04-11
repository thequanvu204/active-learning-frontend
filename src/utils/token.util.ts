import { jwtDecode, JwtPayload } from "jwt-decode";

export const getToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const setToken = (token: string): void => {
  sessionStorage.setItem("token", token);
};

export const removeToken = (): void => {
  sessionStorage.removeItem("token");
};

export const getDecodedTokenValue = (key: string): string | number | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: JwtPayload & { [key: string]: undefined } = jwtDecode(token);
    return decoded[key] ?? null;
  } catch (error) {
    console.error("Fehler beim Dekodieren des Tokens:", error);
    return null;
  }
};
