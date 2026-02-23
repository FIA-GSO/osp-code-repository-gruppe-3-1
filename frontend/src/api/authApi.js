import api from "./apiClient";

export async function login(email, password) {
    const res = await api.post("/auth/login", { email, password }, { withCredentials: true });
    return res.data;
}

export async function getCurrentUser() {
    const res = await api.get("/auth/me", { withCredentials: true });
    return res.data;
}

export async function logout() {
    return api.post("/auth/logout", { withCredentials: true });
}

export function saveSession(data) {
    localStorage.setItem("name", data.email);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userRole", JSON.stringify(data.roles))
}

export function getUserId() {
    return Number(localStorage.getItem("userId"));
}

export function getUserName() {
    return String(localStorage.getItem("name"));
}

export function getUserRole() {
    const roles = localStorage.getItem("userRole");
    return roles ? JSON.parse(roles)[0] : [];
}
