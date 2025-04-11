import apiClient from "./apiClient";
import { LoginResponse } from "@/types/ApiResponses";
import { setToken } from "@/utils/token.util";
import axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/api/login", {
      email,
      password,
    });

    if ("token" in response.data) {
      setToken(response.data.token);
    } else {
      throw new Error(response.data.error || "Login fehlgeschlagen.");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Die Verbindung zum Server wurde abgelehnt.");
      }
      if (error.response?.status === 401) {
        throw new Error("Falsche Login-Daten.");
      }
    }
    throw new Error("Ein unbekannter Fehler ist aufgetreten.");
  }
};

export const register = async (
  email: string,
  username: string,
  password: string,
  admin: boolean
): Promise<any> => {
  try {
    const response = await apiClient.post<any>("/api/create-user", {
      email,
      username,
      password,
      admin,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Die Verbindung zum Server wurde abgelehnt.");
      }
    }
    throw new Error("Ein unbekannter Fehler ist aufgetreten.");
  }
};
