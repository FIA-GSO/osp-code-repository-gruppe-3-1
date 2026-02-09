import api from "./apiClient";

export async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
}

export function saveSession(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
}

export function getUserId() {
    return Number(localStorage.getItem("userId"));
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
}
