import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: { params?: any }) => {
    const response = await axiosInstance.get<T>(this.endpoint, config);
    return response.data;
  };

  getById = async (id: string) => {
    const response = await axiosInstance.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  };

  create = async (data: T) => {
    const response = await axiosInstance.post<T>(this.endpoint, data);
    return response.data;
  };

  update = async (id: string, data: T) => {
    const response = await axiosInstance.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  };

  delete = async (id: string) => {
    const response = await axiosInstance.delete<T>(`${this.endpoint}/${id}`);
    return response.data;
  };

  deleteAll = async () => {
    const response = await axiosInstance.delete<T>(this.endpoint);
    return response.data;
  };
}

export default ApiClient;
