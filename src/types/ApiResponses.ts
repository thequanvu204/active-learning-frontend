type UserData = {
  id: number;
  email: string;
  username: string;
  admin: boolean;
};

type LoginSuccessResponse = {
  success: true;
  message: string;
  user: UserData;
  token: string;
};

type LoginFailureResponse = {
  success: false;
  error: string;
};

export type LoginResponse = LoginSuccessResponse | LoginFailureResponse;

type MLData = {
  admin: boolean;
  batch_size: number;
  date: string;
  email: string;
  file_name: string;
  history_id: number;
  init_train_length: number;
  num_cycles: number;
  result: string;
  training_size: number;
  user_id: number | null;
  username: string | null;
};

export type DashboardData = MLData & {
  message: string;
  role: "admin" | "user";
  user_id: number | null;
};

type DashboardSuccessResponse = {
  message: string;
  user_id: number;
  role: "admin" | "user";
  data: DashboardData[];
};

type DashboardFailureResponse = {
  error: string;
};

export type DashboardReponse =
  | DashboardSuccessResponse
  | DashboardFailureResponse;

export type AccountDetails = {
  userID: string;
  email: string;
  password: string;
};

export type AccountDetailsResponse =
  | AccountDetails
  | {
      error: string;
    };
