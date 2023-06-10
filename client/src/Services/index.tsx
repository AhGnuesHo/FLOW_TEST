import axios from "axios";
import { API_BASE_URL } from "../config";

export const customFetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/extension`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const defaultFetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/extension/default`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
