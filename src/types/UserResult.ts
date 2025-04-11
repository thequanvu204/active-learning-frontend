export type UserResult = {
  user_id: number;
  name: string;
  input_file: {
    name: string;
    timestamp: string;
    size_kb: number;
    format: string;
  };
  model_results: {
    iterations: number;
    scores: number[];
    real_consumptions: number[];
    trend_scores: number[];
    trend_consumptions: number[];
    transition_point: number;
    average_score: number;
  };
  export_file: {
    name: string;
    timestamp: string;
    size_kb: number;
    format: string;
  };
};
