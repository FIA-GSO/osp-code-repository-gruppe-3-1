import api from "./apiClient";

export async function getAllEvents() {
    const res = await api.get("/events/");
    return res.data;
}

export async function getEventById(eventId) {
    const res = await api.get(`/events/${eventId}`, { withCredentials: true });
    return res.data;
}

export async function toggleEventLock(eventId, isLocked) {
    const res = await api.put(`/events/${eventId}`, { registration_locked: isLocked }, { withCredentials: true });
    return res.data;
}