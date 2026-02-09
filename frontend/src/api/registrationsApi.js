import api from "./apiClient";

export async function getUserRegistrations(userId) {
    const res = await api.get(`/registration/user/${userId}`, { withCredentials: true });
    return res.data;
}
