import api from "./apiClient";

export async function getUserRegistrations(userId) {
    const res = await api.get(`/registrations/user/${userId}`);
    return res.data;
}
