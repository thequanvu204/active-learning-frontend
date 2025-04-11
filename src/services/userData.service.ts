import apiClient from "./apiClient";
import axios from "axios";
import { AccountDetailsResponse, DashboardReponse } from "@/types/ApiResponses";

export const getDashboardData = async (): Promise<DashboardReponse> => {
  try {
    const response = await apiClient.get<DashboardReponse>("/api/dashboard");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Connection to Server was refused");
      }
      if (error.response?.status === 403) {
        throw new Error("Permission denied!");
      }
    }
    throw new Error("An unknown error occured!");
  }
};

export const getAccountDetails = async (
  userID: number
): Promise<AccountDetailsResponse> => {
  try {
    const response = await apiClient.get<AccountDetailsResponse>(
      `api/account-details/${userID}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Connection to Server was refused");
      }
      if (error.response?.status === 403 || error.response?.status === 401) {
        throw new Error("Permission denied!");
      }
    }
    throw new Error("An unknown error occured!");
  }
};
