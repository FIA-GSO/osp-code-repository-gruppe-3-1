import api from "./apiClient";

export async function getUserRegistrations(userId) {
    const res = await api.get(`/registration/user/${userId}`, { withCredentials: true });
    return res.data;
}


export async function postFormRegistration(payload) {
    const res = await api.post(
        "/registration/form",
        payload,
        { withCredentials: true }
    );
    return res.data;
}