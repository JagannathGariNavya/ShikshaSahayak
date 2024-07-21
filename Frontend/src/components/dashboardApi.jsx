import axios from 'axios';

const API_BASE_URL = 'https://shikshasahayak.onrender.com';

export const getUserData = (token) => {
  return axios.get(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePassword = (token, newPassword) => {
  return axios.post(`${API_BASE_URL}/user/changePassword`, { newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProject = (token, projectData) => {
  return axios.post(`${API_BASE_URL}/project/update`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsers = (token) => {
  return axios.get(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
