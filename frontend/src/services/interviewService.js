import api from "./api";

export const getInterviews = async () => {
  const response = await api.get("/interviews");
  return response.data;
};

export const createInterview = async (data) => {
  const response = await api.post("/interviews", data);
  return response.data;
};

export const updateInterview = async (id, data) => {
  const response = await api.put(`/interviews/${id}`, data);
  return response.data;
};

export const deleteInterview = async (id) => {
  await api.delete(`/interviews/${id}`);
};