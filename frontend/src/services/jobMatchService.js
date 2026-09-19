import api from "./api";

export const matchJob = async (data) => {
  const response = await api.post("/job-match", data);
  return response.data;
};