// src/services/authService.js
import api from "@/utils/api";

export const login = async (userLogin, motDePasse) => {
  const res = await api.post("/login", { userLogin, motDePasse });
  return res.data; // Contient token + user
};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await api.post("/change-password", {
    oldPassword,
    newPassword
  });
  return res.data;
};
